# Apostila — Tecnologias Assistivas na Educação Inclusiva

> Continuação da sessão do Claude `084286aa-07a9-4ef3-b654-b5c5414855c9`.
> Retomada no Codex em 05/06/2026.

## Arquivos atuais

- HTML final: `/Users/vinijr/Documents/Sistemas/Educare/apostila-tecnologias-assistivas/apostila-tecnologias-assistivas-educare.html`
- PDF final: `/Users/vinijr/Documents/Sistemas/Educare/apostila-tecnologias-assistivas/apostila-tecnologias-assistivas-educare.pdf`
- Assets usados:
  - `/Users/vinijr/Documents/Sistemas/Educare/apostila-tecnologias-assistivas/apostila-logo.png`
  - `/Users/vinijr/Documents/Sistemas/Educare/apostila-tecnologias-assistivas/apostila-foto-capa.png`
  - `/Users/vinijr/Documents/Sistemas/Educare/apostila-tecnologias-assistivas/apostila-fundo-roxo.png`

## Continuação rápida

- Esta é a nota central da apostila de Tecnologias Assistivas. Usar esta nota como ponto de retomada antes de mexer no HTML/PDF.
- Versão atual: 40 páginas A4, aproximadamente 9.027 palavras, 7 capítulos, 3 páginas de oferta e 25 páginas de texto numeradas.
- Entrega real do curso completo: apostila, materiais complementares, avaliação online e certificado de 180h reconhecido pela ABED.
- Não prometer aulas em vídeo enquanto elas não existirem ou não forem aprovadas para produção.
- Não usar "reconhecido pelo MEC" na oferta. MEC aparece apenas em referências bibliográficas quando for fonte citada.
- Contato oficial em páginas legais e materiais: `contato@educarepedagogia.com.br`.
- Oferta dentro da apostila:
  - início: logo após direitos autorais;
  - meio: antes do capítulo 5;
  - final: última página;
  - usar UTMs diferentes por posição.
- Materiais complementares mapeados para criar na próxima etapa:
  - checklist de barreiras da sala;
  - prancha inicial de CAA;
  - modelo de atividade ampliada;
  - roteiro visual de aula acessível;
  - plano de apoio individual;
  - banco de recursos de baixo custo;
  - ficha de acompanhamento.
- Próxima melhor continuação: revisar o PDF completo manualmente, validar a redação institucional sobre ABED e começar a criar os materiais complementares um por vez.

## O que o Claude estava fazendo

- Criou uma apostila em HTML A4 para impressão/PDF.
- Tema: Tecnologias Assistivas na Educação Inclusiva.
- Estrutura final:
  - Capa full-bleed com foto.
  - Página de informações/direitos.
  - Boas-vindas.
  - Sumário com links.
  - 7 capítulos.
  - Referências bibliográficas.
  - Contracapa/oferta com CTA para certificado.
- Estava refinando visualmente capa e contracapa.
- Últimos pontos trabalhados:
  - Reconstrução da capa com posicionamento absoluto.
  - Ajuste do gradiente da capa.
  - Correção de acentos na contracapa.
  - Validação visual por screenshot.

## O que foi continuado no Codex

- Restaurei o background da capa, que tinha sido perdido na última reconstrução do HTML.
- Corrigi a classe `.aviso`, que estava como `.avisó`.
- Corrigi acentuação e textos quebrados em várias partes do material.
- Adicionei regras de impressão A4:
  - `@page { size: A4; margin: 0; }`
  - remoção de sombra/margem no modo print.
  - impressão de cores/backgrounds.
- Regenerei o PDF final pelo Chrome headless.
- Validei a capa do PDF via Quick Look.

## Estado atual

- PDF gerado com sucesso.
- HTML expandido com 40 páginas A4 e 7 capítulos.
- Conteúdo ampliado para aproximadamente 9.027 palavras.
- Capa, páginas de miolo, tabelas, capítulo final e contracapa validados visualmente.
- Oferta preservada e replicada em três pontos:
  - após a página de direitos autorais;
  - no meio da apostila, antes do capítulo 5;
  - no final da apostila.
- Oferta atual:
  - Valor: R$ 77,90.
  - Reconhecimento: ABED.
  - Link base: `https://chk.eduzz.com/v3zxy2ir`

## Expansão de 05/06/2026

- A apostila deixou de ser apenas um material de apoio curto e passou a funcionar como base teórica do curso.
- Foram aprofundados os fundamentos de tecnologia assistiva, acessibilidade, desenho universal, modelo social da deficiência e planejamento pedagógico.
- Cada capítulo ganhou seções novas com objetivos de aprendizagem, perguntas de diagnóstico, alertas de prática e critérios de aplicação em sala.
- Capítulos reforçados:
  - Capítulo 1: diferença entre tecnologia assistiva, acessibilidade, recurso pedagógico e adaptação comum.
  - Capítulo 2: avaliação comunicativa, papel do parceiro de comunicação e uso da CAA no currículo.
  - Capítulo 3: baixa visão, cegueira, funcionalidade visual e material acessível.
  - Capítulo 4: cultura surda, Libras, acessibilidade comunicacional e rotina visual.
  - Capítulo 5: TEA, TDAH, previsibilidade, barreiras sensoriais e plano de apoio individual.
  - Capítulo 6: adaptação sem empobrecer, prototipagem de baixo custo e banco de recursos da escola.
  - Capítulo 7: indicadores de progresso, trabalho em rede e conexão da apostila com o curso completo.
- Referências ampliadas com legislação brasileira, política nacional de educação especial, CAT, autores de tecnologia assistiva, CAA e desenho universal.
- Ajuste visual importante: os rodapés das páginas de texto foram removidos para evitar sobreposição com tabelas e listas densas.
- QA visual feito em páginas representativas renderizadas do PDF:
  - Capa.
  - Página de informações.
  - Abertura de capítulo.
  - Página densa com listas.
  - Página com tabela.
  - Capítulo final.
  - Contracapa.

## Rodada de melhorias e QA de 05/06/2026

- Substituí a comunicação incorreta de reconhecimento pelo MEC por reconhecimento pela ABED.
- Mantive menções ao MEC apenas nas referências bibliográficas, quando o MEC é fonte/publicação citada.
- Atualizei o ano do material para 2026.
- Dividi o sumário em duas páginas para evitar corte dos capítulos finais.
- Dividi a seção 7.4 em página própria para eliminar corte do bloco de encerramento.
- Normalizei a numeração das páginas de texto.
- Ajustei tipografia e espaçamentos do miolo para reduzir risco de sobreposição.
- Padronizei "Libras" e corrigi pequenos erros de acentuação.
- QA textual final:
  - sem "reconhecido pelo MEC" na comunicação comercial;
  - sem "2025" no material;
  - sem IDs duplicados no HTML;
  - 23 páginas de texto numeradas;
  - 43 seções didáticas.
- QA visual final renderizado do PDF:
  - capa;
  - página legal;
  - sumário 1;
  - sumário 2;
  - página com tabela;
  - seção 7.4;
  - referências;
  - contracapa;
  - folha de contato com todas as 37 páginas.

## Rodada de oferta, sumário e profundidade de 05/06/2026

- Removi da oferta a promessa de conteúdo em vídeo, porque a entrega definida para este curso é apostila, materiais complementares, avaliação e certificado.
- Atualizei o e-mail oficial de contato para `contato@educarepedagogia.com.br`.
- Reescrevi a página de direitos autorais:
  - uso permitido;
  - uso não permitido;
  - aviso educacional;
  - contato oficial.
- Redesenhei o sumário em uma única página com cards por capítulo, deixando de listar todas as subseções de forma apertada.
- Inserida página de oferta no início e no meio da apostila, mantendo a oferta final.
- Reescrevi a oferta para vender o valor real:
  - apostila completa;
  - materiais complementares;
  - avaliação online;
  - certificado de 180h reconhecido pela ABED.
- Ajustei os links das três ofertas com UTMs diferentes:
  - `utm_content=oferta-inicio`;
  - `utm_content=oferta-meio`;
  - `utm_content=oferta-final`.
- Acrescentei página de casos integradores para aprofundar a ponte entre teoria e aplicação.
- Acrescentei página de materiais complementares do curso completo:
  - checklist de barreiras da sala;
  - prancha inicial de CAA;
  - modelo de atividade ampliada;
  - roteiro visual de aula acessível;
  - plano de apoio individual;
  - banco de recursos de baixo custo;
  - ficha de acompanhamento.
- Ajustei a tipografia dos blocos de apoio para evitar aparência pesada ou texto grande demais.
- Corrigi resíduos textuais como "legendas automáticas", "lista de verificação" e "satisfação".
- QA textual final:
  - sem promessa comercial de vídeos;
  - sem e-mail antigo;
  - sem "reconhecido pelo MEC";
  - sem ano 2025;
  - sem IDs duplicados;
  - 25 páginas de texto numeradas.
- QA visual final renderizado do PDF:
  - capa;
  - direitos autorais;
  - oferta inicial;
  - sumário;
  - oferta do meio;
  - casos integradores;
  - materiais complementares;
  - referências;
  - oferta final;
  - folha de contato com todas as 40 páginas.

## Concluído em 05/06/2026

- [x] Apostila HTML finalizada (40 páginas, 7 capítulos, ~9.027 palavras)
- [x] PDF gerado via Chrome headless — `/Users/vinijr/Downloads/apostila-tecnologias-assistivas-educare.pdf`
- [x] Redação comercial definida: "reconhecido pela ABED" (nunca MEC)
- [x] Template reutilizável criado em `/Users/vinijr/Documents/Sistemas/Educare/apostila-template.html`
- [x] Template de materiais complementares criado em `/Users/vinijr/Documents/Sistemas/Educare/material-complementar-template.html`

## O que falta

- [ ] Revisão manual do PDF completo no Preview (página a página — feita pelo Vinicius)
- [ ] Upload do PDF no WordPress + pegar URL para o Mautic
- [ ] Upload do PDF no Nutror
- [ ] Material complementar 1 — checklist de barreiras da sala
- [ ] Material complementar 2 — prancha inicial de CAA
- [ ] Material complementar 3 — modelo de atividade ampliada
- [ ] Material complementar 4 — roteiro visual de aula acessível
- [ ] Material complementar 5 — plano de apoio individual
- [ ] Material complementar 6 — banco de recursos de baixo custo
- [ ] Material complementar 7 — ficha de acompanhamento

> Cada material complementar é uma sessão separada e curta. Usar `como-criar-apostilas.md` + `material-complementar-template.html`.
