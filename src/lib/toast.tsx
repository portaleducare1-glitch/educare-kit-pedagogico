import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/cn';

interface ToastItem {
  id: number;
  mensagem: string;
  tipo?: 'padrao' | 'sucesso';
}

interface ToastContextValue {
  mostrar: (mensagem: string, tipo?: ToastItem['tipo']) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const proximo = useRef(0);

  const mostrar = useCallback((mensagem: string, tipo: ToastItem['tipo'] = 'padrao') => {
    const id = ++proximo.current;
    setToasts((prev) => [...prev, { id, mensagem, tipo }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium text-white text-center whitespace-nowrap',
              'animate-in fade-in slide-in-from-bottom-2 duration-200',
              t.tipo === 'sucesso' ? 'bg-brand-green-600' : 'bg-foreground',
            )}
          >
            {t.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
}
