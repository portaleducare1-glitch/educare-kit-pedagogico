# Portal de Materiais · Tarefas (pré-lançamento geral aos compradores)

> Lista única de verdade para esta rodada. Atualizar aqui em vez de decidir
> espalhado entre chat, Vault e changelog — é exatamente o problema que esta spec
> existe para resolver (Eduardo, 26/06/2026).

## Concluído nesta sessão (26/06/2026)

- [x] Corrigir Política de Privacidade e Termos de Uso (descreviam o validador de
  certificados, produto separado, não o Portal de Materiais)
- [x] Adicionar aviso de transparência sobre rastreamento (GA4 + Clarity) na
  primeira visita
- [x] Criar página de redirecionamento `educarepedagogia.com.br/portal-kit-pedagogico`
  → link real do EasyPanel (domínio definitivo ainda sem DNS)
- [x] Confirmar causa raiz do erro do primeiro deploy (.npmrc não copiado no
  Dockerfile) — já corrigido no commit `df5f941`, não deve repetir
- [x] Varredura Playwright completa em Kit 2.0, 3.0, 4.0 e "BNCC 2026" (na
  verdade "Letramento na Educação Infantil" reembalado)
- [x] Adicionar os 7 materiais complementares de Tecnologias Assistivas que já
  estavam hospedados no WordPress desde 09/06 mas nunca entraram no `materiais.ts`
- [x] Escrever esta spec retroativa (`docs/specs/portal-materiais/`)
- [x] Reescrever a fundação do repositório (`ARCHITECTURE.md`, `SECURITY.md`,
  `docs/specs/00-foundation/`), que também descrevia o validador de
  certificados em vez do produto atual; formalizada a regra de modularidade e
  o alinhamento de stack com o Giovanni
- [x] BNCC: conectar a apostila atualizada (já existia, nunca tinha sido
  linkada) + enviar e conectar os 7 materiais complementares (ver detalhe
  abaixo)

## Pendente — conteúdo

- [x] **BNCC: confirmado defasado E corrigido** (26/06/2026). O PDF que estava
  publicado (`Curso-BNCC-2023-educare.pdf`) tinha `CreationDate` de
  outubro/2020, nenhuma menção a ano além de 2022 em 237 páginas. A apostila
  atualizada **já existia**: escrita e aprovada em QA entre 04-12/06/2026
  (`apostila-bncc/apostila-bncc-original.pdf`, 61 páginas, ver
  `Vault/Projetos/Educare/apostila-bncc-status.md`), e até já estava no media
  library do WordPress desde 12/06 (`apostila-bncc-2026.pdf`) — só nunca tinha
  sido conectada ao `materiais.ts`. Os 7 materiais complementares de BNCC
  (Modelo de Plano de Aula, Kit Computação Desplugada, Guia das 10 Competências,
  Checklist, Rubrica, Roteiro de Reunião, Diagnóstico de Escola) também já
  existiam prontos localmente desde 14/06, mas nunca tinham sido enviados ao
  WordPress de fato, apesar do changelog antigo marcar como concluído. Corrigido
  agora: apostila atualizada conectada + 7 complementares enviados e
  conectados. Lição registrada em `apostila-bncc-status.md`: checkbox de
  "concluído" sem verificação real (testar URL, confirmar onde deveria
  aparecer) deixou esse gap parado por quase 2 semanas.
- [x] **Tentativa de pente fino automático nas outras 27 apostilas, sem
  sucesso confiável** (26/06/2026): baixei e inspecionei metadado (`CreationDate`)
  e menções de ano no texto de todas. Resultado: metadado de criação do PDF é
  pouco confiável como sinal de atualidade (vários mostram datas claramente
  erradas, tipo 2007/2008/2013, artefato da ferramenta que gerou o PDF, não data
  real de autoria) e a maioria dos temas (Gestão Escolar, Psicopedagogia,
  Psicomotricidade etc.) é conteúdo atemporal por natureza, não cita ano nenhum
  — então a ausência de ano não indica desatualização. **Conclusão**: auditoria
  de atualidade de conteúdo em escala não dá pra automatizar com confiança; exige
  julgamento de quem conhece o assunto (Eduardo) ou leitura dedicada apostila por
  apostila. Não vou apresentar como "desatualizada" nenhuma apostila que não
  tenha evidência tão forte quanto a da BNCC.
- [x] Baixados do Nutror (login autenticado via Playwright, URLs de CDN exigem
  sessão) e re-hospedados no WordPress, com URL pública testada (200) antes de
  entrar no catálogo:
  - Cartilha de Atividades - Edição Natalina (Kit 2.0) — o arquivo interno
    chama-se "ATIVIDADES NATALINAS - EDUCARE.pdf", a aula chama-se diferente
  - Jogo da Memória Educare (Kit 2.0)
  - Campos de Experiências na Educação Infantil ("BNCC 2026"/Letramento)
  - Material para (Re)elaboração de Documentos Curriculares ("BNCC
    2026"/Letramento)
  - Ferramentas - Tecnologias Educacionais ("BNCC 2026"/Letramento, 53 páginas)
  - "220 Atividades.pdf" — conferido visualmente (render da capa em PNG): o
    título real é **"200 Atividades Pedagógicas"**, sem duplicidade com nada
    do catálogo. Adicionado com o título correto.
- [x] Adicionados ao `materiais.ts` com `novidadeAte: 2026-07-26`. Catálogo foi
  de 136 para **156 materiais**. `tsc --noEmit` e `npm run build` limpos, sem
  id duplicado.
- [x] Versão do rodapé incrementada `v1.0.0 → v1.0.1` (mudança de conteúdo do
  catálogo, conforme regra proposta em `02-design.md`)
- [ ] Decidir o que fazer com `CADERNO-DE-PLANEJAMENTO-2024.pdf` (Kit 4.0, versão
  antiga do planner 2026 já existente) — provável descarte
- [ ] Decidir se vale replicar "Ferramentas Práticas para Aplicação Imediata do
  PEI e PDI" (Kit 4.0), que só existe como embed do Google Drive sem PDF nativo
  no Nutror — checar permissão de acesso antes
- [ ] Confirmar visualmente se os arquivos com nome levemente diferente são
  duplicata do já catalogado (não bloqueador, baixa prioridade):
  `MATEMATICA - EDUCARE.pdf`, `caderno-pedagogico-educare-pedagogia.pdf`,
  `ALFABETO-DE-PAREDE-EDUCARE-PEDAGOGIA.pdf`, `PLANNER - Educare - 2021.pdf`,
  `planner-anual-educare.pdf`

## Pendente — técnico

- [ ] Decidir e aplicar regra de versionamento do rodapé (hoje fixo em
  "v1.0.0" desde 22/06) — ver proposta em `02-design.md`
- [ ] `npm run build` limpo + `npx tsc --noEmit` + `npm run test` antes do push
- [ ] Push para GitHub → Giovanni faz o deploy no EasyPanel
- [ ] Avaliar separadamente (não bloqueador): CORS do WordPress está ecoando
  qualquer origem enviada, não travado num domínio só — superfície de ataque a
  revisar
- [ ] Giovanni: apontar DNS de `kit.educarepedagogia.com.br` para o EasyPanel,
  pra eventualmente desativar o encaminhador e usar o domínio definitivo

## Concluído nesta sessão (continuação 26/06/2026): UX e responsividade desktop

- [x] "Adicionados recentemente" virou carrossel horizontal + página dedicada
  "Ver todos" (`/portal/acervo?novo=1`), em vez de empilhar verticalmente todos
  os materiais novos (ficou comprido demais com a entrada de 20 novidades
  nesta rodada). Reaproveita o padrão de scroll horizontal já usado nos chips
  de filtro do Acervo.
- [x] Auditoria de responsividade desktop via skill `refero-design` (sem MCP
  disponível nesta máquina, pesquisa feita com referências do skill +
  pesquisa real sobre padrões de biblioteca de conteúdo). Achado principal:
  o app nunca teve layout pensado pra desktop (confirmado pelo Eduardo) e o
  cabeçalho não tinha link para o Acervo no desktop (só existia no menu
  inferior, que é mobile-only) — sem isso não havia como navegar pro Acervo
  fora da home.
- [x] Corrigido: link de Acervo no cabeçalho (visível só em `sm:` e acima),
  largura máxima do conteúdo aumentada de `max-w-2xl` para `lg:max-w-5xl`,
  grades de material expandidas de 2 para 3 colunas no desktop (Home, Acervo,
  Materiais relacionados), filtros do Acervo passam a quebrar linha em vez de
  exigir scroll horizontal a partir do desktop. Mobile inalterado (verificado
  visualmente antes/depois).
- [x] Checklist de craft do skill (foco de teclado, formulários, imagens,
  `div` vs `button`/`Link` pra navegação) auditado via grep no código: zero
  violações encontradas, nenhuma ação necessária.
- [x] `tsc --noEmit` e `npm run build` limpos depois de todas as mudanças.

## Comparação com o catálogo do site institucional (26/06/2026)

Levantamento solicitado pelo Eduardo: comparar nossas apostilas com o catálogo
de cursos individuais (cada um com apostila grátis própria) em
`portal.educarepedagogia.com.br/cursos`. 94 cursos distintos encontrados lá
(descontando 2 variantes "promocional" do mesmo curso). **20 já temos no
Portal de Materiais, 74 não.** Isso é esperado: o portal foi curado em torno
do Kit Pedagógico 5.0, não do catálogo geral. Lista completa abaixo, por
categoria (igual ao site), para o Eduardo decidir o que vale trazer.

### Alfabetização (22)
Alfabetização Para Autistas · Alfabetização e Letramento · Alfabetização e
Letramento na Educação Infantil · Artes · As fases Do Desenvolvimento Infantil
· Atividade Física Adaptada · Contador de Histórias · Contação de Histórias no
Ensino Infantil · Discalculia · Educação Inclusiva no Ensino Fundamental ·
Educação Infantil · Educação de Jovens e Adultos · Educação para autistas no
ensino Fundamental · Inteligência Emocional na Educação Infantil (120h) ·
Libras Básico · Linguagem e Expressão · Musica, Arte e Recreação · O Lúdico No
Processo de Alfabetização · O Lúdico na Educação Infantil · Pedagogia ·
Psicomotricidade na Alfabetização · Técnicas de Ensino

### Educação Especial (12)
Educação Especial (genérica) · Educação Especial: Deficiência Intelectual ·
Educação para autistas no ensino infantil · Hiperfoco Infantil · O Lúdico na
Educação Especial · Pedagogia Hospitalar · Psicomotricidade no Autismo ·
Superdotação e Altas Habilidades · Terapia ABA · Transtornos Depressivos na
Infância · Transtorno de Ansiedade · Transtorno de Conduta Infantil (TCI)

### Inclusão (13)
Dislexia · Distúrbios de Aprendizagem · Educação Especial no Ensino
Fundamental · Educação Especial: Deficiência Múltipla · Educação Especial:
Deficiência Visual · Educação Especial: Paralisia Cerebral · Educação
Especial: Síndrome de Down · Educação Inclusiva no Ensino Infantil · Educação
para Autistas no Ensino Médio · Em Educação Inclusiva · Pedagogia Holística ·
Pedagogia Montessori · Pedagogia Social

### Neurociências (9)
Educação Socioemocional · Inteligência Emocional para o Educador ·
Interpretação Do Desenho Infantil · Mindfulness Para Professores ·
Neuro-aprendizagem · PNL na Educação · Psicomotricidade Clínica · Saúde Mental
Infantil · Terapia Baseada Em Lego

### Gestão (6)
Gestão Financeira Escolar · Monitor Escolar · Organização Pedagógica ·
Orientação Educacional · Planejamento Educacional · Saúde Mental do Educador

### Auxiliar (5)
Auxiliar de Creche e Berçarista · Avaliação Educacional · Educador Social ·
Mediador Escolar · Primeiros Socorros Escolar

### Tecnologia (4)
ChatGPT na Educação Infantil · Educação Híbrida · Prática Maker · Tecnologias
Educacionais

### Intérpretes (2)
Alfabetização na Surdez · Alfabetização pelo método fônico

### Direção (1)
Diretor Escolar

**Já temos (20, confirmado):** AEE · Sala de Recursos Multifuncionais ·
Educação Especial: Autismo · Matemática Inclusiva · Educação Integral ·
Psicologia na Aprendizagem e Educação · Comunicação Eficaz · TGD · Coordenação
Pedagógica · TDAH · TOD · Neuropedagogia · Psicopedagogia · Gestão Escolar ·
Avaliação em TEA · Consciência Fonológica · Psicomotricidade (genérica) ·
Educação Especial: Deficiência Física · Educação Especial: Deficiência
Auditiva · BNCC.

## Mapeamento e upload das 74 apostilas faltantes (26/06/2026, continuação)

Eduardo deu a dica certa: como todo e-mail de entrega usa link do WordPress,
quase todas as apostilas faltantes já estavam hospedadas lá (382 PDFs no
total), só nunca tinham sido conectadas ao `materiais.ts`. Processo:

1. Busca por nome em todos os 382 PDFs do WordPress, cruzando com os 74
   tópicos faltantes.
2. **65 de 74 encontradas e confirmadas com URL pública testada (200) antes
   de adicionar.** 2 eram duplicata de algo que já tínhamos (`Em Educação
   Inclusiva` = mesmo arquivo de `Educação Inclusiva` já no catálogo;
   `Tecnologias Educacionais` = mesmo arquivo do material BNCC complementar
   adicionado antes nesta sessão). 1 (`Educação Infantil` genérica) não foi
   encontrada no WordPress sob nenhum nome plausível — segue como pendência
   de upload via Nutror.
3. **6 com registro no WordPress mas arquivo físico quebrado (404 real,
   confirmado até com nome sem acento)**: Linguagem e Expressão, Dislexia
   (a apostila, não as atividades — essas já estavam no catálogo),
   Educação Especial no Ensino Fundamental, Educação Socioemocional, ChatGPT
   na Educação Infantil, Prática Maker. **Achado operacional sério**: como
   Eduardo apontou, e-mails de entrega usam esses mesmos links — se o
   arquivo está quebrado aqui, está quebrado pra quem recebeu por e-mail
   também. Precisa de re-upload (Nutror tem o arquivo original) ou
   confirmação se o problema é mais recente.
4. As 65 confirmadas foram adicionadas ao `materiais.ts` (`secao: apostilas`,
   `novidadeAte: 2026-07-26`), categorizadas reaproveitando as categorias já
   existentes no catálogo. Descrições desta rodada são um template
   conciso ("Apostila de formação em X"), não bespoke como as do BNCC —
   correto pra cobertura rápida, mas pode ser refinado depois se Eduardo
   quiser.
5. Catálogo foi de **156 para 221 materiais**. `tsc --noEmit` e `npm run
   build` limpos, sem id duplicado.

**Pendências resultantes:**
- [ ] Decidir o que fazer com os 6 arquivos quebrados no WordPress (re-upload
  via Nutror ou confirmar se o link nos e-mails de entrega também está
  quebrado para quem já comprou)
- [ ] "Educação Infantil" (genérica) não encontrada no WordPress, avaliar se
  vale buscar no Nutror
- [ ] Refinar descrição/quando-usar/como-usar das 65 novas apostilas com
  texto bespoke quando houver tempo (hoje é texto template genérico)

## Varredura final pré-deploy (26/06/2026, continuação)

Eduardo pediu uma última checagem do que mudou hoje antes do deploy. Achados:

- [x] **Duplicata real corrigida**: "Mindfulness Para Professores" entrou
  duplicado na rodada das 65 — já existia no catálogo (`mindfulness-professores`,
  secao `documentos`, descrição bespoke) apontando pro mesmo PDF. Removida a
  entrada nova (`apostila-mindfulness-para-professores`). Catálogo: 220 materiais.
- [ ] **Achado pré-existente, não corrigido**: `matematica-1-ano`,
  `matematica-2-ano`, `matematica-3-ano`, `matematica-4-ano`,
  `matematica-6-ano` e `caderno-matematica-02` apontam todos para o mesmo
  arquivo (`Caderno-de-Atividades-Matematica-02-Adicao-e-Subtracao`). Já
  estava registrado no comentário do topo do arquivo desde antes desta
  sessão, nunca foi corrigido por falta dos arquivos certos de cada série.
  Precisa de nova varredura no Nutror ou confirmação manual dos arquivos.
- [x] **Decisão de produto sobre o badge "Novo"**: as 65 apostilas de
  preenchimento de catálogo (não conteúdo recém-criado, só conectado hoje)
  tinham `novidadeAte` igual às adições genuinamente novas — resultando em
  85/221 materiais (39%) com badge "Novo" no lançamento. Eduardo decidiu
  remover o badge desses 64 itens de preenchimento, mantendo "Novo" só no que
  é conteúdo de fato recém-criado: apostila BNCC 2026 + 7 complementares BNCC
  + 7 materiais de Tecnologias Assistivas + 6 arquivos baixados do Nutror
  nesta sessão (21 itens, não 85). `tsc` e `npm run build` limpos depois da
  remoção.

## Adiado para sessão dedicada (decisão de Eduardo, 26/06/2026)

- [ ] Cadência de e-mail de anúncio aos compradores (E1/E2/E3) — propositalmente
  não definida ainda, "quero fazer a definição antes de sair criando"
- [ ] Plano de monitoramento (GA4/Clarity) e configuração de leitura via API
- [ ] Pesquisa de validação (uso real, utilidade, percepção de valor) — insumo
  pra decisão de Fase 2

## Melhorias pós-deploy discutidas (26/06/2026, continuação) — onboarding, avaliação, WhatsApp

Eduardo trouxe 3 ideias depois de ver o painel ao vivo: tour guiado de primeira
visita, avaliação por estrela, e bolha de WhatsApp. Discussão registrada aqui
em vez de ficar só no chat.

**Onboarding guiado — decisão: não fazer agora.** Pesquisado (dado real: tours
de 3 passos completam ~72%, de 7 passos cai a 16%), mas decisão final pesa o
contexto específico: já existe o aviso de rastreamento ocupando a primeira
visita, o público (professora) abre o app com pressa por uma necessidade
pontual, e não há nenhum dado de uso ainda pra saber onde ela realmente
travaria. Revisitar depois de 1-2 semanas de Clarity/GA4 reais — se houver
ponto de confusão identificado, construir tour pontual pra aquele ponto
específico, não um tour genérico.

**Avaliação por estrela — decisão: via Typebot, gatilho por visita (não por
material aberto).**
- Gatilho final: **2ª visita** (dia diferente da primeira) **+ pelo menos 2
  materiais abertos no total**. Critério explicitamente preferido sobre
  "3 materiais abertos numa sentada só", porque a curiosidade da primeira
  visita não é sinal de valor real — voltar é.
- Quem responde, nunca mais recebe o pedido naquele aparelho. Quem só fecha
  sem responder pode receber de novo numa visita futura.
- Download (`download_pdf`, já instrumentado no GA4, separado de
  `abrir_material`) decidido como sinal **complementar de análise**, não
  como gatilho — download é ação mais rara no celular, exigir isso geraria
  poucas respostas.
- **Typebot criado via API**, pasta "pesquisas" do workspace Typebot (mesma
  pasta de `Pesquisa Onboarding — Educare` e `Pesquisa Base — Educare`), nome
  `[Pesquisa] Avaliação Portal de Materiais — Kit Pedagógico`, id
  `cmqvjctea000xkq2n6dothg4n`. Fluxo: estrelas (1-5, variável
  `nota_avaliacao_portal`) → bloco de Condição (nota ≤3 vs ≥4) → nota baixa
  pergunta múltipla escolha (com opção "Outro" abrindo texto livre) → nota
  alta pergunta aberta → encerramento. **Revisado e publicado por Eduardo em
  26/06/2026.**
- [x] **Gatilho conectado no código** (`useAvaliacaoPortal.tsx`, plugado no
  `PortalLayout`): conta visita por dia (`localStorage`), conta materiais
  visitados (reaproveita `useVisitados`/nova `contarVisitados`), dispara o
  popup do Typebot só uma vez por aparelho quando 2ª visita + 2 materiais.
  **Testado de ponta a ponta com Playwright** (não só "parece certo"): 1ª
  visita não dispara, 2ª visita dispara, popup abre com a pergunta certa,
  nota baixa ramifica pra pergunta de múltipla escolha como desenhado.
- **Bug real encontrado e corrigido durante o teste:** a primeira tentativa
  importava `@typebot.io/js` errado (`import * as Typebot`) e quebrava o
  `PortalLayoutInner` inteiro (`Typebot.initBubble is not a function`) — só
  não derrubou o app porque existe um `ErrorBoundary`. Corrigido usando o
  import certo (`initPopup` vem do default export de `@typebot.io/js/web`).
- **`apiHost` errado descoberto e corrigido:** builder (`typebot.educarepedagogia.com.br`)
  e viewer público dos bots (`materialgratis.educarepedagogia.com.br`) são
  domínios diferentes neste self-host — Eduardo confirmou o correto colando
  o embed code real do painel. Registrado em `acessos-api.md`.
- **Otimização de performance aplicada:** o pacote `@typebot.io/js/web`
  (~170kB gzip, traz DOMPurify + UI do chat) quase dobrou o bundle principal
  do portal. Corrigido com `import()` dinâmico só no momento em que a
  condição de disparo é atingida — confirmado via Playwright que o chunk não
  é baixado em quem nunca vai disparar a pesquisa. Mesmo padrão de code
  splitting já documentado em `ARCHITECTURE.md` pra pdf.js/tesseract.js.
- **Falta:** conectar o resultado a algum destino externo (planilha/n8n,
  mesmo padrão dos outros typebots) — opcional, já que o Typebot guarda toda
  resposta na própria aba de Resultados, sem precisar de nada a mais pra
  funcionar.
- **Modo trocado de Popup pra Bolha (Bubble), com motivo confirmado por
  Eduardo:** o modo Popup deste Typebot não tem nenhum botão de fechar —
  confirmado no código-fonte oficial (não é configuração faltando, é assim
  que esse modo foi construído) e confirmado por Eduardo testando no
  desktop. Bolha tem botão de abrir/fechar nativo, testado e funcionando.
- **`@typebot.io/react` (pacote oficial) tentado e descartado:** só suporta
  React 16-18 (`peerDependencies`), este projeto está no React 19 — gerar
  "duas cópias do React" no bundle e quebra todos os hooks (`Invalid hook
  call`). Voltado pro pacote genérico `@typebot.io/js` (sem dependência de
  framework), que já funcionava bem antes dessa tentativa. Registrado aqui
  pra não repetir essa tentativa numa sessão futura sem saber do limite.
- **Botão de fechar verificado de forma rigorosa** (não só visual): teste
  Playwright localiza o botão real (não coordenada de tela) e confirma que
  o conteúdo do chat está visível antes do clique e some depois.

**Bolha de WhatsApp — decisão: sim, reaproveitando o link que já existe.**
O rodapé já tem "Suporte" apontando pra
`https://educarepedagogia.com.br/suporte-whatsapp`, que redireciona pro
WhatsApp real (`5565981044319`). Botão flutuante fixo implementado
(`SuporteWhatsAppButton.tsx`), linkando pro mesmo redirecionador do WordPress
(nunca o número direto), escondido enquanto o banner de instalar ou a
avaliação estão ativos pra não conflitar.

## Bateria final "profundamente" antes do deploy (26/06/2026, continuação)

Eduardo pediu explicitamente teste profundo, não raso, antes do deploy. Rodada
em Chromium + WebKit (Safari real, motor instalado pra essa sessão), contra o
`dist/` de produção servido por **nginx real** (instalado via Homebrew só pra
esse teste, rodando o `nginx.conf` do repo literal, não um mock) — não contra
o servidor de dev do Vite, que nunca manda os headers de segurança e por isso
mascarava os problemas abaixo.

- [x] **Crash real corrigido: localStorage bloqueado derrubava o app
  inteiro.** `ThemeProvider` (raiz da árvore) chamava `localStorage.getItem`
  sem try/catch; em modos de navegação muito restritos isso lança erro e o
  `ErrorBoundary` global mostra "Algo deu errado" pra qualquer funcionalidade,
  não só tema. Criado `src/lib/safeStorage.ts` (`safeGetItem`/`safeSetItem`/
  `safeRemoveItem`) e aplicado em `ThemeProvider`, `useInstall`,
  `useTrackingNotice`, `useAvaliacaoPortal` e no botão "Limpar" de
  `PortalHome`. `useFavoritos`/`useVisitados` já tinham proteção própria.
  Confirmado via Playwright simulando `localStorage` lançando erro em ambos
  os motores: antes quebrava, depois não.
- [x] **Achado não previsto, o mais grave da rodada: a CSP de produção
  bloqueava 4 features inteiras, incluindo o Typebot construído hoje.** O
  servidor de dev nunca aplica `Content-Security-Policy`, então nenhum teste
  desta sessão (nem os anteriores) passava por essa validação. Simulando a
  CSP real (primeiro via mock Python, depois via nginx de verdade pra
  garantir fidelidade total), apareceram 5 bloqueios reais em `nginx.conf`
  (arquivo que o `Dockerfile` realmente usa — ver achado de infraestrutura
  abaixo):
  1. **Typebot da avaliação 100% bloqueado** — `connect-src` não incluía
     `materialgratis.educarepedagogia.com.br`, então o `startChat` falhava
     com "Failed to fetch". A pesquisa construída e testada a sessão toda
     nunca teria funcionado em produção.
  2. **Service Worker do PWA 100% bloqueado** — `worker-src` só tinha
     `blob:`, sem `'self'`, e o registro de `/sw.js` (script same-origin) é
     regido por essa diretiva. Instalar como app e funcionamento offline
     quebrados.
  3. **Hash do script inline do GA4 estava errado** — `sha256-FX+Sz...`
     configurado não bate com o hash real do `gtag('config', ...)` builtado
     (`sha256-r4i5PERpQzSj+JzuLsda4zfQiIt+CExCVVs7li1EHVs=`, confirmado
     calculando o hash do `dist/index.html` de verdade). GA4 nunca teria
     disparado nenhum evento.
  4. **Script do Clarity bloqueado** — `script-src` só liberava
     `www.clarity.ms`, não `scripts.clarity.ms` (domínio real de onde carrega
     `clarity.js`). Trocado pra `https://*.clarity.ms`.
  5. **Fonte do próprio widget do Typebot bloqueada** — carrega
     `fonts.bunny.net`, fora do `style-src`/`font-src`. Cosmético (cairia
     pra fonte padrão), mas corrigido.
  - Corrigidos os 5 nos três arquivos que duplicam a CSP (`nginx.conf`,
    `netlify.toml`, `public/.htaccess`). Revalidado depois da correção: 0
    erros inesperados em Chromium (14/14) e WebKit (12/14 — as 2 "falhas"
    restantes são o achado de Clarity/Beacon abaixo, não bug nosso).
  - **Decisão de Eduardo:** pings auxiliares de remarketing do Google Ads
    (`doubleclick.net`, `ads/ga-audiences`) ficam deliberadamente bloqueados
    — o portal não roda campanha de Ads, GA4 principal funciona sem eles, e
    é menos dado compartilhado.
- [x] **Achado de infraestrutura, causa raiz de tudo acima: `nginx.conf` é
  quem manda em produção, não o `.htaccess`.** `DEPLOY.md` dizia "Apache"
  mas o `Dockerfile` builda com `nginx:alpine` e copia `nginx.conf` —
  confirmado batendo direto no domínio do EasyPanel (`Server: nginx` na
  resposta). `nginx.conf` estava com uma CSP de uma versão anterior, de
  antes do Clarity e do Typebot terem sido adicionados ao `.htaccess`/
  `netlify.toml` — os três divergiram e ninguém notou porque nada testa
  contra o nginx real. `DEPLOY.md` atualizado explicando que os três
  arquivos têm a mesma CSP duplicada de propósito e que `nginx.conf` é a
  fonte da verdade; qualquer novo domínio de script/widget precisa entrar
  nos três juntos.
- [x] **Erro do Clarity no WebKit investigado a fundo: é real, é conhecido,
  não é bug nosso.** Em Safari/WebKit, `navigator.sendBeacon`/fetch keepalive
  tem uma cota compartilhada de 64KB por contexto de navegação — confirmado
  via pesquisa (mesmo erro relatado contra o SDK do Datadog, e documentado
  como comportamento de especificação do WebKit). O Clarity ocasionalmente
  estoura essa cota e alguns beacons de gravação de sessão são descartados;
  não quebra nenhuma funcionalidade do app, é uma limitação do
  navegador/terceiro, não corrigível pelo nosso lado.
- [x] **CORS do WordPress reflete qualquer `Origin`, não faz allowlist de
  verdade** — testado enviando um domínio inventado e o WordPress aceitou.
  Equivale na prática a um `*` mesmo "configurado" com o domínio certo.
  Registrado em `DEPLOY.md` como tarefa pendente do lado do WordPress (fora
  deste repositório).
- [x] **Domínio de produção (`kit.educarepedagogia.com.br`) ainda sem DNS** —
  app já está no ar via Docker/EasyPanel, mas só pelo domínio padrão
  (`site-educare-kitpedagogico.vpqsrq.easypanel.host`), que é pra onde o
  botão do WordPress aponta hoje. Esperado nesta fase, registrado em
  `DEPLOY.md` pra não esquecer de trocar o link depois do DNS apontar.
- Versão do rodapé atualizada `v1.0.1` → `v1.0.2` (acumula: correção de
  localStorage, correção de CSP em produção, bolha de WhatsApp, avaliação por
  Typebot).

## Análise de melhorias adicional, pós "mais alguma melhoria?" (26/06/2026)

Eduardo pediu mais uma rodada de análise profunda além do que já tinha sido
testado. Auditoria real com **axe-core** (motor do Lighthouse), não inspeção
visual, nas 5 páginas principais.

- [x] **3 falhas reais de contraste WCAG encontradas e corrigidas:**
  1. Badge "Novo" (`MaterialCard.tsx`): `text-success` sobre `bg-success/15`
     dava 2.54:1 (precisa 4.5:1). Trocado pra `text-brand-green-text`, token
     que já existia no design system pra exatamente esse uso e nunca tinha
     sido aplicado nesse componente → 5.61:1.
  2. Versão no rodapé (`PortalLayout.tsx`): `text-muted-foreground/50`
     dava ~2:1. O `/50` duplicava o esmaecimento de um token que já é
     "secundário" por natureza. Removida a opacidade extra → 5.17:1.
  3. Aba ativa "Favoritos" no menu inferior: `text-brand-coral` no texto
     dava 3.09:1. Criado `--brand-coral-text` (`#b83114`, 5.97:1), seguindo o
     mesmo padrão já usado pra azul/verde/laranja (`--brand-X-text`), e
     aplicado só no texto da aba — o ícone continua com o coral claro normal,
     não é regido pela mesma regra de contraste de texto.
  - Revalidado: 0 violações sérias/críticas em todas as 5 páginas testadas.
- [x] **Achado de segurança contido, sem ação necessária:**
  `logs/nutror-varredura-debug.json` (538KB) tem tokens JWT reais de acesso
  ao Nutror/Eduzz capturados durante a varredura de cursos desta sessão.
  Confirmado: `logs/` está no `.gitignore`, nunca entrou no histórico do git.
  Tokens de acesso expiram em 15min (`exp - iat` do payload), já mortos.
  Achado independente, não substitui a tarefa já existente "Rotacionar JWT
  Nutror/Eduzz (exposto em 09/06/2026)" no `DEPLOY.md`, que se refere a uma
  exposição anterior em histórico de chat, não neste arquivo.

## Terceira rodada de "mais alguma melhoria?" (26/06/2026, continuação)

- [x] **`/portal/*` agora garante `noindex` de verdade, não só pede.** O
  portal não tem login nesta fase (link recebido por e-mail é o único
  controle de acesso) e `robots.txt` já tinha `Disallow: /portal/`, mas isso
  só pede pros crawlers bem-comportados não rastrearem — não impede a URL de
  aparecer indexada se alguém compartilhar o link em algum lugar público.
  Adicionado `X-Robots-Tag: noindex, nofollow` via header HTTP (camada que
  garante de verdade, não depende de crawler respeitar nada) nos três
  arquivos de config (`nginx.conf`, `.htaccess`, `netlify.toml`), escopado só
  pra `/portal/*` — `/`, `/privacidade`, `/termos` continuam indexáveis
  normalmente.
  - **Pegadinha real do nginx descoberta no processo:** a primeira tentativa
    (`location ^~ /portal { add_header ...; try_files ...; }`) parecia certa
    mas nunca funcionava de verdade — o `try_files` redireciona internamente
    pra `/index.html` quando a rota não existe como arquivo real (que é
    sempre o caso pras rotas do React Router), e esse redirecionamento
    interno faz o nginx reavaliar a location do zero pro novo destino, caindo
    no bloco `~* \.html$` em vez do bloco original. Corrigido movendo a
    condição pra dentro do bloco `.html$` mesmo, usando
    `if ($request_uri ~ ^/portal)` — `$request_uri` preserva a URL original
    do cliente mesmo depois do redirecionamento interno, ao contrário de
    `$uri`. Confirmado com nginx real (não mock): `/portal/acervo` tem o
    header, `/` e `/privacidade` não têm, e a bateria completa de testes
    (14/14 Chromium) continua passando depois da mudança.
- [ ] **Pendente, decisão de produto, não de bug:** botão de favoritar em
  cada card de material (`MaterialCard.tsx`) tem área de toque de 24x24px
  (ícone 16px + padding de 4px). Cumpre o mínimo técnico do WCAG 2.5.8 (AA,
  24px), mas fica bem abaixo do padrão de conforto que Apple/Google
  recomendam (44/48px) — e esse é o botão mais repetido do app (aparece nos
  220 materiais). Mesma situação em "Fechar aviso" (24x24) e "Limpar"
  (38x16px de altura). Não corrigido porque aumentar a área de toque muda o
  tamanho visual do botão em todo lugar que ele aparece — decisão de
  visual/produto, não correção óbvia de bug.
- **Verificado e descartado (não eram bugs reais):** busca com 1 caractere
  acentuado (ex. "ç") retorna o catálogo inteiro — é o guard intencional de
  "mínimo 2 caracteres pra buscar" funcionando como desenhado, não falha de
  normalização. `temas`/`situacoes`/`etapas` não passam por `normalizar()`
  em `busca.ts` (inconsistente com os outros campos) mas são sempre slugs
  ASCII minúsculos por convenção, então não tem efeito prático hoje.
- [x] **Área de toque aumentada, com aprovação de Eduardo:** botão de
  favoritar (`MaterialCard.tsx`) de 24x24px → ~40x40px (`p-1`→`p-3`,
  `top-3 right-3`→`top-2 right-2`, `pr-10`→`pr-12` no texto pra não
  sobrepor). Confirmado por screenshot: ícone do coração visualmente na
  mesma posição, sem sobrepor título/badge. "Fechar aviso" do
  `TrackingNotice.tsx` 24x24→36x36 (padding+margem negativa, mesma técnica).
  "Limpar" de `PortalHome.tsx` ganhou hitbox invisível maior (`py-3 -my-3
  px-1 -mx-1`) sem mudar o tamanho visual do texto.
- [x] **Contraste do "Limpar" corrigido de quebra:** `text-muted-foreground/60`
  dava ~2.4:1. Esse achado só apareceu agora porque a seção "Continue de
  onde parou" só renderiza com histórico de visita — não existia no
  navegador limpo da varredura anterior. Removida a opacidade extra, igual
  ao rodapé.
- [ ] **Achado novo, mais sério, pendente de decisão:** o tratamento visual
  de card "já visitado" (`opacity-70` no card inteiro, em `MaterialCard.tsx`)
  quebra contraste de qualquer texto que já estivesse no limite, porque
  opacidade dilui a cor renderizada. Confirmado com números: mesmo subindo
  pra `opacity-90` (quase imperceptível como "esmaecido"), o texto da
  descrição (`text-muted-foreground`) ainda fica em 4.13:1, abaixo do
  4.5:1 — não tem opacidade que resolva sem also tornando o esmaecimento
  inútil visualmente. Esse problema só piora quanto mais a professora usa o
  app (mais cards "visitados" acumulam o defeito). **Não corrigido**: a
  solução de verdade é trocar a abordagem (esmaecer só borda/ícone, ou usar
  um selo "já visto" em vez de opacidade no texto), não é ajuste de número —
  decisão de design, registrada aqui pra próxima sessão de iteração visual.

## Redesenho do estado "visitado" (26/06/2026, continuação)

Eduardo perguntou se o `opacity-70` foi decisão dele. Não foi: confirmado via
`git log -S"opacity-70"` que entrou no commit único de scaffold inicial
(`640cfa4`, 10/06/2026), sem registro de discussão, e a spec (`01-
requirements.md`, R3) só exige "permitir ver histórico", sem especificar a
forma visual — era escolha de implementação de sessão anterior, nunca
validada visualmente por ele. Pesquisado (WebSearch: WCAG non-text contrast +
padrões de "lido/completo" em LMS, leitores de artigo, e-mail) antes de
decidir: nenhuma referência usa opacidade no conteúdo inteiro pra indicar
estado — o padrão consistente é selo/ícone separado, porque opacidade sempre
dilui contraste do texto quando visível o suficiente pra perceber (confirmado
matematicamente na rodada anterior: nem opacity-90 resolve).

- [x] **Implementado: selo "Visto" substitui a opacidade no card inteiro**
  (`MaterialCard.tsx`). Removido `opacity-70`/`border-border/50`/`hover:
  opacity-100` do card "já visitado" — título e descrição agora sempre em
  contraste pleno, visitado ou não. Adicionado selo `✓ Visto` (ícone `Check`
  + texto, estilo contorno, `border-border`/`text-muted-foreground`) na
  mesma linha do selo "Novo" — contorno em vez de preenchido de propósito,
  pra ler como "neutro" em vez de "chamativo" (preenchido é reservado pro
  "Novo", que deve mesmo chamar atenção). Contraste calculado antes de
  aplicar: 5.05:1 (margem confortável acima do mínimo 4.5:1).
  - Motivo do desenho, não só o quê: a seção "Continue de onde parou" existe
    pra fazer a professora reabrir algo que já visitou — esmaecer com
    opacidade comunica "isso importa menos", o oposto da intenção da seção.
    Um selo neutro comunica o estado sem sugerir irrelevância.
  - Convive bem com "Novo" simultâneo (mesmo material novo E já aberto):
    testado visualmente via screenshot, os dois selos cabem na mesma linha
    sem cortar.
  - Revalidado depois da troca: axe-core 0 violações graves/críticas em toda
    bateria, incluindo a seção "Continue de onde parou" (que só renderiza
    com histórico de visita — não existia na varredura anterior, por isso só
    apareceu agora). Bateria completa de produção (nginx real): Chromium
    14/14, WebKit 12/14 (as 2 restantes continuam sendo só o achado já
    confirmado de Beacon API do Safari, não regressão).
- Versão `v1.0.5`.

## Correção da regra de versionamento (26/06/2026, continuação)

Eduardo perguntou se a versão conta por commit ou por deploy. Resposta:
não tinha regra confirmada, só uma proposta de sessão anterior nunca validada
(`02-design.md`, marcado "não resolvido"). **Decidido agora: versão sobe só
quando o código vai pro ar em produção, nunca antes.** Como nada desta sessão
foi deployado ainda, o bump de `v1.0.1` até `v1.0.5` feito a cada correção
estava errado por essa regra — **revertido o rodapé de volta pra `v1.0.1`**
(versão da última build realmente em produção). Todas as correções desta
sessão continuam implementadas no código, só o número não sobe até o deploy
de verdade acontecer. Regra documentada em `02-design.md`. Próximo deploy:
decidir o número certo na hora (patch vs. minor, ver critério no
`02-design.md`) — dado o volume de mudança (Typebot de avaliação, WhatsApp,
correção de CSP em produção, 3 fixes de contraste, redesenho do "visitado"),
provavelmente é minor (`v1.1.0`), não patch.

## Revisão final pré-deploy de verdade (27/06/2026)

Eduardo confirmou que push no `main` dispara deploy automático no EasyPanel
— ou seja, o momento do commit/push É o deploy, não um passo manual
separado depois. Por isso esta revisão foi tratada como a última checagem
antes de produção de fato, não mais um teste local.

- [x] **Higiene de repositório:** achadas 2 pastas do Life Psicologia
  (`life-combo-3-cursos-emails/`, `life-psicodocumentos-pagina-vendas/`)
  dentro do repo Educare por engano (sessão de 24-25/06, diretório de
  trabalho errado) — movidas pra `Sistemas/` antes de qualquer commit, não
  entraram na história do git do Educare. Também adicionado ao
  `.gitignore`: `apostila-bncc/` (conteúdo cru, mesmo padrão de outras
  pastas de conteúdo já ignoradas), `.agents/`/`.context/` (ferramenta local
  de IA, equivalente ao `.claude/` que já era ignorado),
  `apostila-creator-workspace/` (dados de avaliação do skill-creator, não é
  conteúdo do app).
- [x] **`DEPLOY.md` corrigido: a seção "Como fazer o deploy" descrevia um
  fluxo que não existe** (clonar/instalar/buildar manualmente, servir
  estático). A realidade (confirmada em sessão anterior e agora oficializada
  com Eduardo): é Docker, `nginx.conf` é a config real, e **push no main já
  é o deploy**, automático.
- [x] **Varredura completa de qualidade de código (jscpd + knip, projeto
  inteiro, não só o escopo incremental dos hooks) encontrou e corrigiu 2
  duplicações reais:**
  1. `SECAO_ICON` (mapa ícone por seção) estava copiado literalmente em
     `MaterialCard.tsx` E `PortalAcervo.tsx` — exatamente "duas funções que
     fazem a mesma coisa". Extraído pra `types.ts` (mesmo lugar de
     `SECAO_LABELS`, já era o padrão estabelecido pra mapas chaveados por
     `Secao`), os dois arquivos agora importam de um lugar só.
  2. `src/lib/cn.ts` tinha uma função `normalize()` (remove acento) **nunca
     usada em lugar nenhum**, fazendo basicamente a mesma coisa que
     `normalizar()` já existente e em uso dentro de `busca.ts` — achado via
     knip (export morto) + inspeção manual confirmando a duplicação
     conceitual. Removida.
  - Também removida `agruparPorCategoria` em `busca.ts` — export sem
    nenhuma referência em lugar nenhum do código, sem menção em nenhuma
    spec sugerindo uso futuro planejado (diferente do caso do
    `supabase.ts`, que tem plano documentado).
  - **Decisão deliberada de não tocar:** 11 clones restantes no jscpd são
    padrão JSX repetido (boilerplate do shadcn em `card.tsx`, barra de
    busca repetida entre `PortalAcervo`/`PortalHome`, wrapper de "chips de
    filtro" repetido 2x dentro do próprio `PortalAcervo` pra seção/tema,
    cabeçalho compartilhado entre `PrivacyPolicy`/`TermsOfUse`) — refatorável,
    mas mexer em estrutura visual na véspera do deploy tem risco de
    regressão maior que o ganho agora. Registrado aqui como recomendação
    pra uma sessão de limpeza dedicada, não bloqueou o deploy.
  - Achados do knip aceitos como estão, não removidos: `alert.tsx`,
    `badge.tsx`, `progress.tsx`, `skeleton.tsx` (primitivas do shadcn
    instaladas mas não usadas ainda — normal ter biblioteca de componente
    maior que o uso atual), `supabase.ts` (stub intencional Fase 2,
    confirmado anteriormente), exports do `button.tsx`/`card.tsx`
    (`buttonVariants`, `ButtonProps`, `CardHeader` etc. — exports padrão do
    shadcn pra quem for customizar, não sobra de implementação).
- [x] **Bateria completa revalidada depois de todas as correções desta
  rodada** (rebuild + nginx real simulando produção): Chromium 14/14,
  WebKit 12/14 (as 2 restantes continuam sendo só o achado de Beacon API do
  Safari, sem regressão). axe-core: 0 violações graves/críticas, incluindo a
  seção "Continue de onde parou".
- [x] Versão bumpada pra `v1.1.0` — primeira vez que a versão sobe desde o
  lançamento (`v1.0.1` ficou parado no código desde 22/06, exatamente
  porque a regra nova diz que só sobe no momento real do deploy, e esta é a
  primeira vez que um deploy de verdade vai acontecer desde essa decisão).
