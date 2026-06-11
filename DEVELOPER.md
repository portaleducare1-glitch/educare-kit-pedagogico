# Educare - Guia do Desenvolvedor & Documentação do Sistema

Bem-vindo à documentação técnica do **Educare**. Este documento fornece instruções organizadas para configurar, rodar, estender e compilar o sistema para plataformas móveis (Android e iOS).

---

## 1. Stack Tecnológica

O Educare foi projetado sob os pilares de **desempenho, segurança e portabilidade**:

- **Vite + React (TypeScript)**: SPA leve com renderização ultra rápida.
- **Vanilla CSS (Custom Properties)**: Design system escalável, sem dependências que afetem a performance.
- **Lucide Icons**: Pacote de ícones moderno e performático.
- **Capacitor (Pronto)**: Ponte para converter o Educare em um aplicativo nativo Android e iOS sem alteração de base de código.
- **Supabase (Pronto)**: Estrutura desenhada para integração fácil via SDK oficial.

---

## 2. Estrutura de Pastas

```
educare/
├── public/                 # Recursos públicos (Logos, imagens estáticas)
├── src/
│   ├── assets/             # Arquivos de mídia locais
│   ├── components/         # Componentes compartilhados organizados por domínio
│   │   ├── Layout/         # Elementos estruturais (Sidebar, Header, Layout)
│   │   └── UI/             # Componentes reutilizáveis (Botões, Inputs, Cards)
│   ├── pages/              # Módulos ou páginas do sistema
│   │   ├── Dashboard/      # Painel interno administrativo
│   │   ├── Settings/       # Configurações de conta e integrações
│   │   └── Validator/      # Validador público de certificados (Externo)
│   ├── styles/             # Tokens do Design System
│   │   ├── variables.css   # Variáveis globais (HSL, fontes, sombras, espaçamentos)
│   │   └── global.css      # Reset CSS e classes utilitárias
│   ├── types/              # Definições de tipos do TypeScript
│   ├── App.tsx             # Gerenciamento de rotas e estado geral
│   └── main.tsx            # Ponto de entrada do React
├── package.json            # Scripts e dependências
├── vite.config.ts          # Configurações de build do Vite
└── tsconfig.json           # Configurações do compilador TypeScript
```

---

## 3. Configuração do Ambiente e Inicialização Local

Para rodar o projeto localmente, execute os seguintes passos no seu terminal:

1. **Instalar as dependências**:
   ```bash
   npm install
   ```
2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   O sistema estará rodando em `http://localhost:3000`.

*Nota:* Caso seu terminal não possua o Node.js/NPM global no PATH, certifique-se de configurar o NVM ou instalar o Node LTS do site oficial ([nodejs.org](https://nodejs.org/)).

---

## 4. Como Criar um Novo Módulo (Passo a Passo)

A arquitetura do Educare é modular. Para adicionar uma nova página/funcionalidade (ex: Módulo de Cursos), siga estes passos:

### Passo 1: Criar a Pasta da Página e Estilos
Na pasta `src/pages/`, crie uma nova pasta `Courses` contendo:
- `Courses.tsx` (Lógica e estrutura do componente)
- `Courses.css` (Estilos específicos)

Exemplo básico de `Courses.tsx`:
```tsx
import React from 'react';
import './Courses.css';

export const Courses: React.FC = () => {
  return (
    <div className="courses-container">
      <h2>Gestão de Cursos</h2>
      <p>Gerencie o catálogo de cursos e suas cargas horárias.</p>
    </div>
  );
};
```

### Passo 2: Registrar no Roteador Geral (`src/App.tsx`)
1. Importe o novo componente no topo de [App.tsx](file:///Users/vinijr/Documents/Sistemas/Educare/src/App.tsx):
   ```tsx
   import { Courses } from './pages/Courses/Courses';
   ```
2. Adicione o título da rota no método `getPageTitle`:
   ```tsx
   case '/courses':
     return 'Lista de Cursos';
   ```
3. Registre o componente no switch de renderização `renderPageContent`:
   ```tsx
   case '/courses':
     return <Courses />;
   ```

### Passo 3: Adicionar à Sidebar ou Header (`src/components/Layout/Sidebar.tsx`)
Se desejar que o módulo conste no menu lateral, adicione-o ao array `menuItems`:
```typescript
{
  id: 'courses',
  title: 'Cursos',
  iconName: 'BookOpen',
  path: '/courses'
}
```
*Dica:* O sistema mapeará automaticamente a string do `iconName` para o ícone correspondente do pacote `lucide-react`.

---

## 5. Integração com o Supabase (Futuro)

Quando for o momento de plugar o banco de dados Supabase:

1. **Instale o cliente**:
   ```bash
   npm install @supabase/supabase-js
   ```
2. **Crie a conexão em `src/supabaseClient.ts`**:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```
3. **Exemplo de Consulta no Módulo Validador**:
   Substitua a busca local em `src/pages/Validator/Validator.tsx` por uma consulta assíncrona:
   ```typescript
   const { data, error } = await supabase
     .from('certificates')
     .select('*')
     .eq('code', certCode.trim())
     .single();
   ```

---

## 6. Compilação Nativa (Android & iOS) com Capacitor

O Capacitor facilita compilar a SPA web em aplicativos nativos de alto desempenho.

### Passo 1: Instalar o Capacitor
```bash
npm install @capacitor/core @capacitor/cli
```

### Passo 2: Inicializar o Capacitor no Projeto
```bash
npx cap init Educare com.educare.app --web-dir=dist
```
*(Certifique-se de preencher o nome do app e o ID do pacote correspondente)*.

### Passo 3: Adicionar as Plataformas Nativas
```bash
# Instala os pacotes das plataformas
npm install @capacitor/android @capacitor/ios

# Adiciona as pastas de código nativo ao projeto
npx cap add android
npx cap add ios
```

### Passo 4: Sincronizar Builds
Sempre que fizer modificações no código React/CSS:
1. Gere o build de produção do Vite:
   ```bash
   npm run build
   ```
2. Sincronize os arquivos gerados na pasta `/dist` com as pastas nativas:
   ```bash
   npx cap sync
   ```
3. Abra as IDEs nativas para compilar/testar:
   ```bash
   npx cap open android   # Abre no Android Studio
   npx cap open ios       # Abre no Xcode
   ```

**Segurança no App Móvel**: O Capacitor executa a SPA localmente via `file://` ou `http://localhost`, protegida pelo sandbox do iOS/Android. Para requisições externas ao Supabase, use HTTPS nativo para prevenir ataques de Man-in-the-Middle (MITM).
