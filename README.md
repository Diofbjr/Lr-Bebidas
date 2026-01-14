# 📦 Meu Depósito - Sistema de Gestão de Estoque e PDV

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

O **Meu Depósito** é uma aplicação desktop de alta performance desenvolvida para gestão de depósitos e pontos de venda (PDV). Focada em uma experiência de usuário (UX) fluida, a interface é moderna, escura e otimizada para operações rápidas.

## 🚀 Funcionalidades Atuais

- [x] **Gestão de Usuários**: Cadastro, edição e controle de status (Ativo/Inativo).
- [x] **Níveis de Acesso**: Perfis diferenciados (Administrador, Gerente e Caixa).
- [x] **Segurança**: Fluxo de reset de senha com requisitos de segurança em tempo real.
- [x] **Interface Moderna**: Desenvolvida com Tailwind CSS e animações Framer Motion/Native.
- [ ] **PDV (Em desenvolvimento)**: Sistema de vendas rápido.
- [ ] **Estoque (Em desenvolvimento)**: Controle de entrada e saída de produtos.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza o **Electron Forge** com o template de **Vite** para garantir um ambiente de desenvolvimento rápido e pacotes leves.

- **Frontend**: [React.js](https://reactjs.org/)
- **Desktop Framework**: [Electron](https://www.electronjs.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Ícones/Assets**: [Lucide React](https://lucide.dev/) (ou SVGs customizados)

## 📂 Organização do Projeto

A estrutura de pastas segue as melhores práticas para projetos Electron + React:

```text
renderer/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── env.d.ts
    ├── components/
    │   ├── ui/                    # Componentes burros (reutilizáveis)
    │   │   ├── Button/
    │   │   │   ├── index.tsx
    │   │   │   └── styles.ts
    │   │   ├── Input/
    │   │   ├── Modal/
    │   │   └── Select/
    │   │
    │   ├── layout/                # Estrutura visual das telas
    │   │   ├── Sidebar/
    │   │   ├── Header/
    │   │   └── PageContainer/
    │   │
    │   └── feedback/              # UX / Estados visuais
    │       ├── Toast/
    │       ├── Loader/
    │       └── EmptyState/
    │
    ├── pages/                     # Telas (regra + layout)
    │   ├── Login/
    │   │   ├── index.tsx
    │   │   └── styles.ts
    │   ├── Dashboard/
    │   ├── Produtos/
    │   ├── Vendas/
    │   └── Usuarios/
    │
    ├── services/                  # Comunicação externa
    │   ├── ipc/
    │   │   ├── produtos.ts
    │   │   ├── vendas.ts
    │   │   └── usuarios.ts
    │
    ├── hooks/                     # Hooks de domínio
    │   ├── useAuth.ts
    │   ├── useModal.ts
    │   └── useDebounce.ts
    │
    ├── types/                     # Tipos globais
    │   ├── produto.ts
    │   ├── venda.ts
    │   └── usuario.ts
    │
    ├── styles/
    │   └── globals.css
```
## 🛤️ Sistema de Rotas
A navegação é gerenciada através de um estado centralizado no App.tsx, permitindo transições suaves entre as páginas sem recarregamento:

| Rota (Internal) | Descrição                               | Acesso          |
|-----------------|------------------------------------------|-----------------|
| dashboard       | Visão geral das vendas e estoque         | Todos           |
| usuarios        | Listagem e gerenciamento de perfis       | Admin           |
| estoque         | Controle de produtos e fornecedores      | Admin/Gerente   |
| vendas          | Interface de PDV                         | Todos           |
| financeiro      | Relatórios de fechamento e lucros        | Admin           |
