import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function TermsOfUse() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao validador
      </Link>

      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground">Atualizados em 31 de maio de 2026</p>
      </header>

      <Card>
        <CardContent className="space-y-8 pt-6 text-sm leading-relaxed text-foreground">

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">1. O serviço</h2>
            <p>
              Este é o validador público de certificados da Educare, operado por
              EDUCARE CURSOS E TREINAMENTOS LTDA, CNPJ 28.719.923/0001-17. O serviço permite
              que qualquer pessoa verifique se um certificado em formato PDF foi emitido
              pela Educare, sem necessidade de cadastro e sem envio de dados a servidores.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">2. Caráter informativo</h2>
            <p>
              O resultado produzido por este validador tem caráter exclusivamente
              informativo. Ele indica se o arquivo apresentado corresponde ao padrão
              técnico dos certificados emitidos pela Educare, mas não constitui prova
              jurídica de autenticidade, não substitui a verificação direta com a
              instituição emissora e não tem valor probatório em procedimentos
              administrativos ou judiciais.
            </p>
            <p>
              Em caso de dúvida sobre a autenticidade de um certificado, entre em
              contato com a Educare pelo e-mail contato@educarepedagogia.com.br.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">3. Uso permitido</h2>
            <p>
              O serviço destina-se a:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Titulares de certificados emitidos pela Educare que desejam confirmar a autenticidade do seu documento.</li>
              <li>Empregadores, instituições e terceiros que receberam um certificado e desejam verificá-lo.</li>
            </ul>
            <p>
              É vedado utilizar este serviço para fins ilícitos, para tentar identificar
              vulnerabilidades do sistema ou para qualquer outra finalidade não prevista
              nestes termos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">4. Limitação de responsabilidade</h2>
            <p>
              A Educare não se responsabiliza por:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Certificados falsificados que eventualmente passem pelas verificações técnicas.</li>
              <li>Certificados legítimos que não passem nas verificações por problemas de leitura ou variações no arquivo.</li>
              <li>Danos decorrentes do uso ou da impossibilidade de uso do serviço.</li>
              <li>Indisponibilidade temporária do serviço.</li>
            </ul>
            <p>
              O validador utiliza verificações técnicas baseadas em padrões do documento,
              sem acesso a base de dados de certificados emitidos. Isso significa que o
              resultado reflete a conformidade do arquivo com o padrão Educare, e não
              confirma a existência do certificado em registros internos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">5. Propriedade intelectual</h2>
            <p>
              O código-fonte, o design e o conteúdo deste serviço são de propriedade da
              Educare ou de seus licenciantes. O uso do serviço não transfere qualquer
              direito de propriedade intelectual ao usuário.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">6. Alterações</h2>
            <p>
              A Educare reserva-se o direito de alterar estes termos a qualquer momento.
              A versão vigente é sempre a publicada nesta página, com a data de atualização
              indicada no topo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">7. Contato</h2>
            <p>
              Dúvidas, solicitações ou notificações devem ser enviadas para
              contato@educarepedagogia.com.br.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
