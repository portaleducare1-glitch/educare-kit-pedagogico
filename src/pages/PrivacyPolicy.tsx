import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao validador
      </Link>

      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground">Atualizada em 31 de maio de 2026</p>
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
              Site: https://portal.educarepedagogia.com.br<br />
              Contato: contato@educarepedagogia.com.br
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">2. Quais dados são tratados</h2>
            <p>
              Quando você envia um certificado para validação, o sistema extrai e exibe
              temporariamente os seguintes dados presentes no próprio documento:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Nome do aluno</li>
              <li>CPF ou CNPJ do titular</li>
              <li>Datas de início e término do curso</li>
              <li>Nome do curso e carga horária</li>
            </ul>
            <p>
              Esses dados não são coletados, armazenados, transmitidos nem compartilhados
              pela Educare. O processamento ocorre exclusivamente no seu dispositivo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">3. Como processamos</h2>
            <p>
              Todo o processamento, incluindo a leitura do PDF e o reconhecimento de texto (OCR),
              acontece inteiramente no seu navegador. Nenhum arquivo, nenhum dado extraído e
              nenhum resultado é enviado a qualquer servidor. Ao fechar ou sair da página,
              todos os dados deixam de existir.
            </p>
            <p>
              O modelo de idioma usado pelo OCR é baixado de um servidor de distribuição de
              conteúdo (CDN) apenas da primeira vez que você usa o validador. Somente o modelo
              é transferido, nunca o conteúdo do seu documento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">4. Finalidade e base legal</h2>
            <p>
              O tratamento tem a finalidade exclusiva de verificar se um certificado foi emitido
              pela Educare. A base legal é o legítimo interesse da instituição emissora em
              disponibilizar um meio de conferência de autenticidade para os seus titulares,
              nos termos do art. 7º, inciso IX, da Lei 13.709/2018 (LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">5. Armazenamento local (localStorage)</h2>
            <p>
              A única informação gravada no seu dispositivo é a preferência de tema visual
              (claro ou escuro), sob a chave <code className="rounded bg-muted px-1">educare-theme</code>.
              Esse dado não é pessoal e pode ser apagado a qualquer momento limpando o
              armazenamento local do seu navegador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">6. Cookies e rastreamento</h2>
            <p>
              Este serviço não utiliza cookies, pixels de rastreamento, ferramentas de análise
              de audiência nem qualquer tecnologia de monitoramento de comportamento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">7. Transferência internacional</h2>
            <p>
              Não há transferência de dados pessoais para outros países, pois nenhum dado
              pessoal sai do seu dispositivo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">8. Direitos do titular</h2>
            <p>
              Como nenhum dado pessoal é coletado ou armazenado por nós, os direitos de acesso,
              retificação, exclusão, portabilidade e oposição previstos no art. 18 da LGPD
              são exercidos diretamente pelo titular sobre o arquivo em seu próprio dispositivo.
            </p>
            <p>
              Para dúvidas ou solicitações, entre em contato pelo e-mail
              contato@educarepedagogia.com.br.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-base font-bold">9. Vigência e alterações</h2>
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
