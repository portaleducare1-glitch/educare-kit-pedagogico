import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function TermsOfUse() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/portal"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao portal
      </Link>

      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground">Atualizados em 26 de junho de 2026</p>
      </header>

      <Card>
        <CardContent className="space-y-8 pt-6 text-sm leading-relaxed text-foreground">

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">1. O serviço</h2>
            <p>
              Este é o Portal de Materiais do Kit Pedagógico 5.0, operado por
              EDUCARE CURSOS E TREINAMENTOS LTDA, CNPJ 28.719.923/0001-17. O portal reúne
              apostilas, atividades e documentos prontos para consulta, download e
              compartilhamento, oferecido como benefício adicional a quem adquiriu o Kit
              Pedagógico 5.0, sem necessidade de cadastro ou senha.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">2. Fase de teste</h2>
            <p>
              O portal está em fase de avaliação. Isso significa que pode passar por
              mudanças de conteúdo, layout ou funcionalidades, apresentar instabilidade
              temporária, ou ser descontinuado, conforme os resultados dessa avaliação.
              Usamos ferramentas de análise de uso durante essa fase, detalhadas na{' '}
              <Link to="/privacidade" className="underline underline-offset-2 hover:text-foreground">
                Política de Privacidade
              </Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">3. Uso permitido</h2>
            <p>
              O acesso destina-se a compradores do Kit Pedagógico 5.0, para uso pessoal e
              profissional dos materiais em sala de aula ou no planejamento pedagógico.
            </p>
            <p>
              É vedado redistribuir, revender ou compartilhar publicamente o link de acesso
              ao portal ou os arquivos nele disponíveis fora desse uso individual, bem como
              utilizar o serviço para fins ilícitos ou para tentar identificar
              vulnerabilidades do sistema.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">4. Limitação de responsabilidade</h2>
            <p>
              A Educare não se responsabiliza por:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Danos decorrentes do uso ou da impossibilidade de uso do portal.</li>
              <li>Indisponibilidade temporária do serviço durante a fase de teste.</li>
              <li>Uso dos materiais fora do contexto pedagógico para o qual foram criados.</li>
            </ul>
            <p>
              Os materiais são fornecidos como estão, com finalidade educacional, e não
              substituem avaliação ou acompanhamento profissional individualizado quando o
              caso do aluno exigir.
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
              Dúvidas, solicitações ou notificações devem ser enviadas para{' '}
              <a href="mailto:contato@educarepedagogia.com.br" className="underline underline-offset-2 hover:opacity-80">contato@educarepedagogia.com.br</a>.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
