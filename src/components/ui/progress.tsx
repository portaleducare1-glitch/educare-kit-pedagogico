import { cn } from '@/lib/cn';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor de 0 a 100. */
  value?: number;
}

/** Barra de progresso simples (sem Radix). Usada no OCR. */
function Progress({ value = 0, className, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };
