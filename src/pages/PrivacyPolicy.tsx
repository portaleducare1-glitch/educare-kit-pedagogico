import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/portal"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao portal
      </Link>

      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground">Atualizada em 26 de junho de 2026</p>
      </header>

      <Card>
        <CardContent className="space-y-8 pt-6 text-sm leading-relaxed text-foreground">

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">1. Controlador dos dados</h2>
            <p>
              O responsável pelo tratamento dos dados pessoais neste serviço é:
            </p>
            <p className="rounded-lg bg-muted px-4 py-3 font-medium">
              EDUCARE CURSOS E TREINAMENTOS LTDA<br />
              CNPJ: 28.719.923/0001-17<br />
              Site: https://app.educarepedagogia.com.br/portal<br />
              Contato: contato@educarepedagogia.com.br
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">2. O que é este portal</h2>
            <p>
              O Portal de Materiais do Kit Pedagógico 5.0 reúne apostilas, atividades e
              documentos prontos para consulta, download e compartilhamento. Não há cadastro,
              login nem envio de arquivos ou documentos pessoais por parte de quem usa o portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">3. Quais dados são tratados</h2>
            <p>
              Como o portal está em fase de teste, usamos ferramentas de análise de uso para
              entender como os professores navegam, o que buscam e quais materiais acessam,
              com o objetivo de melhorar o produto. Essas ferramentas coletam, de forma
              anônima ou pseudonimizada:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Páginas e materiais visitados, buscas realizadas, downloads e cliques</li>
              <li>Gravação de sessão e mapas de calor (movimento do mouse, toque, rolagem)</li>
              <li>Informações técnicas do dispositivo e navegador, e localização aproximada via IP</li>
            </ul>
            <p>
              O portal não pede nome, CPF, e-mail ou qualquer outro dado de identificação direta.
              As ferramentas de análise mascaram automaticamente campos sensíveis e não capturam
              o conteúdo de PDFs visualizados.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">4. Ferramentas de análise usadas</h2>
            <p>
              Usamos dois serviços de terceiros para essa análise:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li><strong>Google Analytics 4</strong> (Google LLC): estatísticas de uso e eventos de navegação</li>
              <li><strong>Microsoft Clarity</strong> (Microsoft Corporation): gravação de sessão e mapas de calor</li>
            </ul>
            <p>
              Esses dados ficam armazenados nos servidores dessas empresas, conforme as
              respectivas políticas de privacidade do{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Google
              </a>{' '}
              e da{' '}
              <a
                href="https://privacy.microsoft.com/pt-br/privacystatement"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Microsoft
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">5. Finalidade e base legal</h2>
            <p>
              O tratamento tem a finalidade de avaliar a utilidade do portal nesta fase de
              teste e priorizar melhorias antes de uma versão definitiva. A base legal é o
              legítimo interesse da Educare em desenvolver e aprimorar seus produtos, nos
              termos do art. 7º, inciso IX, da Lei 13.709/2018 (LGPD). Você pode impedir essa
              coleta a qualquer momento bloqueando cookies de terceiros nas configurações do
              seu navegador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">6. Armazenamento local (localStorage)</h2>
            <p>
              O portal grava no seu dispositivo, sem enviar a nenhum servidor: a preferência de
              tema visual (claro ou escuro), os materiais marcados como favoritos e o histórico
              de materiais visitados (para o recurso "continue de onde parou"). Nenhum desses
              dados é pessoal, e todos podem ser apagados a qualquer momento limpando o
              armazenamento local do seu navegador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">7. Cookies</h2>
            <p>
              O Google Analytics 4 e o Microsoft Clarity gravam cookies próprios no seu
              navegador para reconhecer visitas e sessões de forma anônima. Você pode bloquear
              ou apagar esses cookies nas configurações do navegador sem perder acesso a
              nenhuma funcionalidade do portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">8. Transferência internacional</h2>
            <p>
              Os dados de uso anônimo coletados pelo Google Analytics 4 e pelo Microsoft
              Clarity podem ser processados em servidores fora do Brasil, operados por essas
              empresas sob seus próprios mecanismos de conformidade internacional, aceitos
              como salvaguarda adequada nos termos do art. 33 da LGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">9. Direitos do titular</h2>
            <p>
              Você pode solicitar informações sobre os dados de uso anônimo coletados, ou pedir
              que parem de ser coletados em relação à sua navegação, pelo e-mail
              contato@educarepedagogia.com.br. Como o portal não exige cadastro, a forma mais
              direta de exercer os direitos do art. 18 da LGPD é bloquear cookies de terceiros
              no seu navegador, o que interrompe a coleta para os próximos acessos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">10. Vigência e alterações</h2>
            <p>
              Esta política entra em vigor na data indicada no topo desta página. A Educare
              pode atualizá-la a qualquer momento. Alterações relevantes serão comunicadas
              por meio de aviso nesta mesma página.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
