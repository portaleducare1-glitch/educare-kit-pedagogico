# Portal de Materiais (Kit Pedagógico 5.0) · Requisitos

> Status: implementado (Fase 1), em preparação para liberação geral aos compradores.
> Esta spec foi escrita retroativamente em 26/06/2026 — o módulo foi construído sem
> spec prévia, o que é a causa raiz de decisões terem ficado espalhadas entre chat,
> Vault e changelog em vez de num único lugar. Estilo EARS.

## Objetivo

Dar aos compradores do Kit Pedagógico 5.0 um jeito rápido e mobile-first de achar,
consultar e compartilhar os materiais do curso (apostilas, atividades, documentos),
substituindo a navegação difícil pelo Nutror. Servir também como observação de
comportamento real antes de evoluir para o Assistente Pedagógico (SaaS maior).

## Atores

- **Professora compradora do Kit Pedagógico 5.0**: acessa via link, sem login, busca
  e usa materiais.
- **Eduardo (produto)**: decide o que entra no catálogo, acompanha uso via GA4/Clarity.
- **Giovanni (infra)**: faz o deploy no EasyPanel, mantém CORS/DNS do WordPress.

## Requisitos funcionais (já implementados)

- **R1** O sistema DEVE permitir busca textual tolerante a erro de acento/grafia
  (ex.: "altismo", "tdha") nos 3 catálogos (apostilas, atividades, documentos).
- **R2** O sistema DEVE permitir filtro combinado por seção, etapa escolar, tema e
  situação.
- **R3** O sistema DEVE permitir favoritar e ver histórico de materiais visitados,
  persistidos em localStorage, sem conta/login.
- **R4** O sistema DEVE permitir compartilhar um material via WhatsApp.
- **R5** O sistema DEVE ser instalável como PWA (Android e iOS) e funcionar offline
  para o básico de navegação.
- **R6** O sistema DEVE marcar como "Novo" qualquer material com `novidadeAte` futuro.

## Requisitos funcionais (novos, desta rodada de pré-lançamento)

- **R7** Quando o usuário visitar qualquer página do portal pela primeira vez, o
  sistema DEVE exibir um aviso de transparência sobre rastreamento (GA4 + Clarity),
  dispensável e que não volta a aparecer depois de fechado. *(Implementado 26/06.)*
- **R8** A Política de Privacidade e os Termos de Uso DEVEM descrever o
  comportamento real do Portal de Materiais (não o do validador de certificados,
  produto separado). *(Implementado 26/06.)*
- **R9** Antes de liberar o acesso geral aos compradores, o catálogo DEVE estar
  livre de apostilas com versão defasada quando uma versão mais nova existir no
  Nutror (ex.: suspeita levantada sobre a apostila de BNCC, hoje datada 2023).
- **R10** Quando um novo deploy for publicado com mudança de conteúdo visível ao
  usuário, o sistema DEVE refletir isso na versão exibida no rodapé (hoje fixo em
  "v1.0.0", nunca incrementado desde o lançamento de 22/06).

## Requisitos não funcionais

- **RNF1** Sem backend, sem login, sem variável de ambiente obrigatória (Fase 1).
- **RNF2** Mobile-first, instalável, funcional em conexão lenta de sala de aula.
- **RNF3** O link público divulgado aos compradores NÃO deve depender diretamente
  da URL de infraestrutura (EasyPanel), para sobreviver a trocas de domínio/deploy.

## Decisões registradas

- Certificado e validação de certificado **não fazem parte** desta fase nem deste
  módulo — são tratados pelo curso/produto separado, confirmado por Eduardo em
  26/06/2026.
- Liberação será para **todos os compradores do Kit Pedagógico 5.0** (não um piloto
  menor), porque o conteúdo do portal foi montado especificamente a partir da
  estrutura do 5.0, e porque o acesso pelo portal é mais simples que pelo Nutror
  (sem senha).
- Cadência de e-mail de anúncio e plano de pesquisa de validação foram
  **propositalmente adiados** para uma sessão dedicada (decisão de Eduardo em
  26/06/2026) — não fazem parte do escopo de pré-lançamento técnico.
