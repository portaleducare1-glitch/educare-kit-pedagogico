#!/usr/bin/env python3
"""Run a command after a local server is reachable, then stop the server."""

from __future__ import annotations

import argparse
import socket
import subprocess
import sys
import time


def wait_for_port(port: int, timeout: float) -> None:
    deadline = time.time() + timeout
    last_error: OSError | None = None

    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=1):
                return
        except OSError as exc:
            last_error = exc
            time.sleep(0.25)

    raise RuntimeError(f"server did not open port {port} within {timeout:.0f}s: {last_error}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--server", required=True, help="server command, for example: npm run dev")
    parser.add_argument("--port", required=True, type=int)
    parser.add_argument("--timeout", default=30, type=float)
    parser.add_argument("command", nargs=argparse.REMAINDER)
    args = parser.parse_args()

    command = args.command
    if command and command[0] == "--":
        command = command[1:]
    if not command:
        parser.error("missing command after --")

    server = subprocess.Popen(args.server, shell=True)
    try:
        wait_for_port(args.port, args.timeout)
        return subprocess.call(command)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()


if __name__ == "__main__":
    sys.exit(main())
