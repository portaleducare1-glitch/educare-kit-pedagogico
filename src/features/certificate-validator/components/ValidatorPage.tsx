import { useCallback, useState } from 'react';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { OcrProgress } from '@/lib/pdf/ocr';
import { CertificateDropzone } from './CertificateDropzone';
import { ValidationResult } from './ValidationResult';
import type { ValidationPhase } from '../lib/validateCertificate';
import type { ValidationReport } from '../lib/types';

type Status = 'idle' | 'processing' | 'done' | 'error';

const PHASE_LABEL: Record<ValidationPhase, string> = {
  reading: 'Lendo o arquivo...',
  extracting: 'Extraindo informações...',
  ocr: 'Reconhecendo o texto do certificado...',
  evaluating: 'Conferindo o padrão Educare...',
  done: 'Concluído',
};

export function ValidatorPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [phase, setPhase] = useState<ValidationPhase>('reading');
  const [ocr, setOcr] = useState<OcrProgress | null>(null);
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setReport(null);
    setError(null);
    setOcr(null);
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setStatus('processing');
    setError(null);
    setReport(null);
    setOcr(null);
    setPhase('reading');

    try {
      // Import dinâmico: carrega o motor (pdf.js + regras) só agora.
      const { validateCertificate } = await import('../lib/validateCertificate');
      const result = await validateCertificate(file, {
        onPhase: setPhase,
        onOcrProgress: setOcr,
      });
      setReport(result);
      setStatus('done');
    } catch (err) {
      const message =
        err instanceof Error && err.name === 'PdfInputError'
          ? err.message
          : 'Não foi possível processar o arquivo. Tente novamente com um PDF válido.';
      setError(message);
      setStatus('error');
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero com gradiente da marca */}
      <header className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#4890d0] to-[#2d6baa] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
        {/* Bolas decorativas com cores da logo */}
        <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-brand-orange/20" />
        <div className="pointer-events-none absolute -left-8 bottom-0 size-36 rounded-full bg-brand-green/25" />
        <div className="pointer-events-none absolute right-1/4 -bottom-6 size-24 rounded-full bg-brand-yellow/20" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
            <ShieldCheck className="size-4" />
            Validador de certificados
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Verifique a autenticidade do seu certificado
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Envie o PDF do certificado emitido pela Educare. A conferência acontece no seu
            próprio dispositivo, de forma rápida e segura.
          </p>
        </div>
      </header>

      {status === 'idle' && <CertificateDropzone onFile={handleFile} />}

      {status === 'processing' && (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="font-display text-lg font-bold">{PHASE_LABEL[phase]}</p>
            {phase === 'ocr' && ocr && (
              <div className="w-full max-w-sm space-y-2">
                <Progress value={Math.round(ocr.progress * 100)} />
                <p className="text-xs text-muted-foreground">
                  {ocr.status} ({Math.round(ocr.progress * 100)}%)
                </p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Nenhum arquivo é enviado pela internet.
            </p>
          </CardContent>
        </Card>
      )}

      {status === 'error' && (
        <>
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Não foi possível validar</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <CertificateDropzone onFile={handleFile} />
        </>
      )}

      {status === 'done' && report && <ValidationResult report={report} onReset={reset} />}
    </div>
  );
}
