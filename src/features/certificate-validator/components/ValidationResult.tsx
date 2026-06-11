import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import { formatIdentifier, maskCpf } from '../lib/format';
import type { ValidationReport } from '../lib/types';
import { ChecksList } from './ChecksList';
import { FieldRow } from './FieldRow';

interface ValidationResultProps {
  report: ValidationReport;
  onReset: () => void;
}

export function ValidationResult({ report, onReset }: ValidationResultProps) {
  const valid = report.status === 'valid';
  const { fields } = report;

  const identifierLabel =
    fields.identifierType === 'cnpj' ? 'CNPJ' : fields.identifierType === 'cpf' ? 'CPF' : 'Documento';

  return (
    <div className="space-y-6">
      {/* Faixa de status */}
      <Card
        className={cn(
          'overflow-hidden border-2',
          valid ? 'border-success/40' : 'border-destructive/40',
        )}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <span
            className={cn(
              'flex size-14 shrink-0 items-center justify-center rounded-2xl',
              valid ? 'bg-success-subtle text-success' : 'bg-destructive/10 text-destructive',
            )}
            aria-hidden
          >
            {valid ? <ShieldCheck className="size-8" /> : <ShieldAlert className="size-8" />}
          </span>
          <div className="flex-1">
            <Badge variant={valid ? 'success' : 'destructive'}>
              {valid ? 'Certificado válido' : 'Não validado'}
            </Badge>
            <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight">
              {valid ? 'Certificado autêntico da Educare' : 'Possível falsificação'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {valid
                ? 'O documento corresponde ao padrão dos certificados emitidos pela Educare.'
                : 'O documento não segue o padrão dos certificados da Educare. Verifique a origem do arquivo.'}
            </p>
          </div>
        </CardHeader>
      </Card>

      {valid && (
        <Card>
          <CardHeader>
            <h3 className="font-display text-lg font-bold">Dados do certificado</h3>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <FieldRow label="Nome do aluno" value={fields.studentName} />
            <FieldRow label="Curso" value={fields.courseName} />
            <FieldRow
              label={identifierLabel}
              value={
                fields.identifier
                  ? fields.identifierType === 'cpf'
                    ? maskCpf(fields.identifier)
                    : formatIdentifier(fields.identifier)
                  : null
              }
            />
            <FieldRow
              label="Carga horária"
              value={fields.workloadHours ? `${fields.workloadHours}h` : null}
            />
            <FieldRow label="Início" value={fields.startDate} />
            <FieldRow label="Término" value={fields.endDate} />
          </CardContent>
        </Card>
      )}

      {valid ? (
        <Card>
          <CardHeader>
            <h3 className="font-display text-lg font-bold">Verificações</h3>
          </CardHeader>
          <CardContent>
            <ChecksList checks={report.checks} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            O arquivo enviado não passou nas verificações de autenticidade da Educare.
            Certifique-se de que o PDF foi gerado diretamente pela plataforma Educare e
            não foi modificado. Em caso de dúvida, entre em contato pelo e-mail
            contato@educarepedagogia.com.br.
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline" size="lg" onClick={onReset}>
          Validar outro certificado
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Este resultado tem caráter informativo e não constitui prova jurídica de autenticidade.
        Em caso de dúvida, entre em contato com a Educare.
      </p>
    </div>
  );
}
