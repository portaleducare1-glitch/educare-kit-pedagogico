import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FieldRowProps {
  label: string;
  value: string | null;
}

/** Linha de um campo extraído: rótulo + valor, com check verde quando presente. */
export function FieldRow({ label, value }: FieldRowProps) {
  const present = Boolean(value);
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
      <span
        className={cn(
          'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
          present ? 'bg-success-subtle text-success' : 'bg-muted text-muted-foreground',
        )}
        aria-hidden
      >
        {present ? <Check className="size-4" /> : <Minus className="size-4" />}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className={cn('font-semibold break-words', !present && 'text-muted-foreground')}>
          {value ?? 'Não identificado'}
        </p>
      </div>
    </div>
  );
}
