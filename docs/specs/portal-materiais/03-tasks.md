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
