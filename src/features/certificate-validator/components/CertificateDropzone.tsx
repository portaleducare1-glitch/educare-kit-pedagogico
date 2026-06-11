import { useRef, useState } from 'react';
import { FileText, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface CertificateDropzoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

/** Área de upload do certificado: arrastar e soltar ou selecionar arquivo. */
export function CertificateDropzone({ onFile, disabled }: CertificateDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) pick(e.dataTransfer.files);
      }}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-card px-6 py-12 text-center transition-colors',
        dragging && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand-purple to-[#6344e0] text-white shadow-md">
        <UploadCloud className="size-8" />
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg font-bold">Envie o certificado em PDF</p>
        <p className="text-sm text-muted-foreground">
          Arraste o arquivo aqui ou clique no botão. Tamanho máximo de 15 MB.
        </p>
      </div>
      <Button onClick={() => inputRef.current?.click()} disabled={disabled} size="lg" className="bg-linear-to-r from-brand-purple to-[#6344e0] text-white hover:opacity-90 shadow-sm">
        <FileText />
        Selecionar arquivo PDF
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={(e) => pick(e.target.files)}
      />
    </div>
  );
}
