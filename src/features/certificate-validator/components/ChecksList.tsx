import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { CheckResult } from '../lib/types';

/** Lista de verificações feitas no certificado, com ícone por resultado. */
export function ChecksList({ checks }: { checks: CheckResult[] }) {
  return (
    <ul className="space-y-2">
      {checks.map((check) => {
        const failedWarning = !check.passed && check.severity === 'warning';
        const failedCritical = !check.passed && check.severity === 'critical';
        return (
          <li key={check.id} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 shrink-0" aria-hidden>
              {check.passed ? (
                <CheckCircle2 className="size-4 text-success" />
              ) : failedWarning ? (
                <AlertTriangle className="size-4 text-warning-foreground" />
              ) : (
                <XCircle className="size-4 text-destructive" />
              )}
            </span>
            <div>
              <p
                className={cn(
                  'font-medium',
                  failedCritical && 'text-destructive',
                  failedWarning && 'text-warning-foreground',
                )}
              >
                {check.label}
              </p>
              {check.detail && (
                <p className="text-xs text-muted-foreground">{check.detail}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
