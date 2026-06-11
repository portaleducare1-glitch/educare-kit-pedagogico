# Educare · Design System

Fonte da verdade visual. Os tokens vivem em `src/index.css` (`:root`),
expostos ao Tailwind v4 via `@theme inline`. Paleta alinhada ao portal principal Educare (Giovanni Sampaio, padrão 2026).

## Princípios

- Lúdico e acolhedor (produto de educação infantil/pedagogia), com cantos
  arredondados e cores vivas da marca.
- Acessível: contraste adequado, foco visível, componentes Radix.
- Responsivo: mobile-first, mesmo design no desktop, com telas e safe-areas nativas.

## Paleta de marca (padrão Educare)

| Token | Hex | Uso |
|---|---|---|
| `--brand-purple` | `#7C5CFC` | **Primária — cor principal Educare** |
| `--brand-purple-600` | `#6344E0` | Hover / active do primário |
| `--brand-purple-50` | `#F0ECFF` | Fundo sutil roxo |
| `--brand-green` | `#60C088` | Sucesso / "validado" |
| `--brand-orange` | `#F07830` | Destaque / acentos |
| `--brand-yellow` | `#E6B81E` | Aviso |
| `--brand-coral` | `#EC6A4E` | Erro / "possível falsificação" |
| `--brand-gray` | `#787878` | Texto neutro |
| `--brand-blue` | `#4890D0` | Azul da logo (uso decorativo, não é o primário) |

## Tokens semânticos

`background, foreground, card, popover, primary, secondary, muted, accent,
destructive, success (+ success-subtle), warning (+ warning-subtle), border,
input, ring`. Cada um tem versão clara e escura. Use sempre o token semântico
nas classes (`bg-primary`, `text-success`, `border-border`), nunca o hex cru.

### Como usar no Tailwind

```tsx
<button className="bg-primary text-primary-foreground rounded-lg">...</button>
<span className="bg-success-subtle text-success">Validado</span>
<p className="text-destructive">Possível falsificação</p>
```

## Tipografia

- **Display (títulos)**: Nunito (700/800/900). Classe: `font-display` (padrão em `h1..h4`).
- **Corpo**: DM Sans (400/500/600/700). Classe: `font-sans` (padrão do `body`).
- Self-hosted via `@fontsource` (sem rede em runtime, funciona offline no nativo).
- Alinhado ao padrão do portal principal Educare (Nunito + DM Sans).

## Raio e elevação

- `--radius: 0.875rem`. Escala: `rounded-sm/md/lg/xl/2xl`.
- Sombras suaves (`shadow-sm`) em cards e botões primários.

## Tema claro/escuro

`ThemeProvider` (`src/components/theme/`) alterna a classe `.dark` no `<html>`,
respeita `prefers-color-scheme` e persiste em `localStorage` (`educare-theme`).
Use `<ThemeToggle />` para o botão.

## Convenções de texto (house style)

- **Tudo em português do Brasil**, com acentuação correta.
- **Proibido travessão** (em dash, U+2014) e en dash (U+2013) em texto visível ao
  usuário. Use o ponto médio para separar, vírgula para cláusulas, "de X a Y" para
  intervalos e hífen simples só em listas/tabelas. (Mesma regra do Aerogestor.)

## Componentes base (shadcn/ui)

Em `src/components/ui/`: `button`, `card`, `badge`, `alert`, `skeleton`,
`progress`. Adicione novos seguindo o mesmo padrão (cva + `cn`, tokens
semânticos). As variantes de `badge`/`alert` incluem `success`, `warning` e
`destructive` ligadas aos tokens.
