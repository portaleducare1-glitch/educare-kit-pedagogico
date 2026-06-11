import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  erro: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: false };

  static getDerivedStateFromError(): State {
    return { erro: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Educare] Erro não tratado:', error, info.componentStack);
  }

  render() {
    if (this.state.erro) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center bg-background">
          <p className="text-4xl">😕</p>
          <h1 className="text-lg font-bold text-foreground">Algo deu errado</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Ocorreu um erro inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
