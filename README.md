<p align="center">
  <img src="./public/banner.png" alt="Banner Halo Message App" width="100%">
</p>

<h1 align="center">💬 Halo Message App 💬</h1>

<p align="center">
  <em>"Conecte-se em tempo real, onde quer que esteja"</em>
</p>

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-Conclu%C3%ADdo-green">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC.svg?style=flat&logo=typescript&logoColor=white">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E.svg?style=flat&logo=nestjs&logoColor=white">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A.svg?style=flat&logo=react&logoColor=61DAFB">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=mongodb&logoColor=white">
  <img alt="Socket.io" src="https://img.shields.io/badge/Socket.io-010101.svg?style=flat&logo=socket.io&logoColor=white">
  <img alt="Licença" src="https://img.shields.io/badge/license-MIT-blue">
</p>


---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
  - [O Conceito](#o-conceito)
  - [O Sistema](#o-sistema)
- [✨ Features Principais](#-features-principais)
- [🎨 Design System (UI/UX)](#-design-system-uiux)
  - [Paleta de Cores](#paleta-de-cores)
  - [Tipografia](#tipografia)
- [�️ Stack Tecnológica](#️-stack-tecnológica)
- [🏛️ Arquitetura](#️-arquitetura)
  - [Banco de Dados (Schema)](#banco-de-dados-schema)
  - [Estrutura de Pastas](#estrutura-de-pastas)
- [🗺️ Documentação da API](#️-documentação-da-api)
- [�🚀 Como Executar](#-como-executar)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

### O Conceito

O **Halo Message App** foi inspirado no conceito de **"halo"** (auréola/círculo de luz) — representando a conexão que ilumina e aproxima pessoas através da comunicação. O projeto busca resolver o problema da **fragmentação da comunicação móvel**, oferecendo uma solução completa, moderna e de código aberto para troca de mensagens em tempo real.

* **Inspiração Visual:** WhatsApp, Telegram (design limpo e minimalista com foco em dark mode)
* **Filosofia:** Comunicação instantânea, segura e com experiência de usuário fluida em dispositivos móveis nativos.

### O Sistema

O **Halo Message App** é um sistema **full-stack de mensagens instantâneas** que inclui um **backend robusto em NestJS** e um **frontend mobile nativo em React Native CLI** (sem Expo). A comunicação em tempo real é garantida por **WebSockets (Socket.IO)**, enquanto a persistência de dados é feita em **MongoDB**.

O foco do projeto é **construir uma aplicação segura, modular, escalável e performática**, seguindo princípios de **Clean Code, SOLID e Atomic Design**. O sistema utiliza uma arquitetura de **monorepo** para facilitar o desenvolvimento integrado entre mobile e backend.

---

## ✨ Features Principais

A aplicação é dividida em **quatro módulos principais** no frontend e **três módulos no backend**.

### 📱 Módulos Mobile (React Native)

#### **1. Autenticação (Login/Register)**
- **Login/Registro:** Sistema de autenticação com validação de credenciais
- **Modo Toggle:** Interface única que alterna entre login e registro
- **Feedback Visual:** Mensagens de erro e sucesso contextualizadas
- **Persistência de Sessão:** Token JWT armazenado com AsyncStorage

#### **2. Lista de Conversas (Users Screen)**
- **Lista de Usuários:** Visualização de todos os usuários cadastrados
- **Status Online/Offline:** Indicadores em tempo real do status de conexão
- **Badge de Mensagens Não Lidas:** Contador visual de mensagens pendentes
- **Preview de Última Mensagem:** Exibição da última mensagem trocada
- **Empty State:** Mensagem amigável quando não há conversas

#### **3. Chat em Tempo Real**
- **Mensagens Instantâneas:** Envio e recebimento via WebSocket
- **Histórico Persistente:** Carregamento de mensagens anteriores do MongoDB
- **Indicadores de Leitura:** Sistema de confirmação de leitura (✓ / ✓✓) estilo WhatsApp
- **Layout Responsivo:** Bolhas de mensagem diferenciadas para enviadas/recebidas
- **Auto-scroll:** Rolagem automática para mensagens mais recentes

#### **4. Configurações (Settings)**
- **Perfil do Usuário:** Visualização de avatar, nome e bio
- **Opções de Conta:** Editar perfil, notificações, privacidade
- **Logout:** Desconexão segura com limpeza de sessão

### ⚙️ Módulos Backend (NestJS)

#### **1. AuthModule**
- Registro de novos usuários
- Login com geração de JWT
- Criptografia de senhas com bcrypt
- Estratégia JWT Guard para rotas protegidas

#### **2. UsersModule**
- CRUD completo de usuários
- Upload e servir avatares estáticos
- Endpoint para listar usuários disponíveis

#### **3. ChatModule (WebSocket Gateway)**
- Gerenciamento de conexões Socket.IO
- Evento `send_message`: Persistência e broadcast de mensagens
- Evento `mark_as_read`: Marcar mensagens como lidas
- Notificação de status online/offline
- Contagem de mensagens não lidas por conversa

---

## 🎨 Design System (UI/UX)

O design segue uma **estética dark mode minimalista** com destaque para a cor primária **ciano (#6DEAED)**, criando um contraste elegante e moderno. Todos os componentes foram desenvolvidos seguindo o padrão **Atomic Design** (atoms → molecules → organisms).

### Paleta de Cores

| Cor | Hex | Uso |
| :--- | :--- | :--- |
| 🌑 **Background** | `#111111` | Fundo principal do aplicativo |
| 📦 **Surface** | `#1C1C1E` | Fundo de cards, inputs e elementos destacados |
| 💎 **Primary** | `#6DEAED` | Cor principal (botões, ícones ativos, status online) |
| 🌊 **Primary Dark** | `#5BC8CB` | Variação escura para hover/press states |
| ✨ **Primary Light** | `#8FFFFF` | Variação clara para gradientes e destaques |
| ⚪ **Text Primary** | `#FFFFFF` | Texto principal de alta legibilidade |
| 🔘 **Text Secondary** | `#8A8A8E` | Texto secundário, placeholders, timestamps |
| ❌ **Error** | `#FF4D4D` | Mensagens de erro e ações destrutivas |
| ✅ **Success** | `#4ADE80` | Confirmações e ações bem-sucedidas |
| 📏 **Border** | `rgba(138, 138, 142, 0.3)` | Bordas sutis com transparência |

### Tipografia

- **Títulos (Headings):** System Default (SF Pro / Roboto)  
  Usada para títulos de telas e headers principais, transmitindo hierarquia e clareza.
  
- **Corpo & UI (Body):** System Default (SF Pro / Roboto)  
  Utilizada em textos de mensagens, labels e elementos de interface para máxima legibilidade.

> **Nota:** O projeto utiliza as fontes padrão do sistema operacional (San Francisco no iOS, Roboto no Android), garantindo performance e consistência nativa.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Backend** | **NestJS 11** | Framework Node.js modular e escalável com suporte nativo a TypeScript, injeção de dependências e arquitetura MVC |
|  | **Socket.IO 4.8** | Comunicação bidirecional em tempo real com fallback automático e reconexão |
|  | **Mongoose 8.19** | ODM para MongoDB com schemas tipados e validações integradas |
|  | **JWT + Passport** | Autenticação stateless com tokens seguros |
| **Frontend** | **React Native CLI 0.82** | Framework mobile nativo (não Expo) para performance otimizada e acesso total a módulos nativos |
|  | **TypeScript 5.8** | Segurança de tipos e melhor DX (Developer Experience) |
|  | **React Navigation 6** | Navegação nativa com Stack e Bottom Tabs |
|  | **Zustand 5** | Gerenciamento de estado global leve e performático |
|  | **Socket.IO Client 4.8** | Cliente WebSocket com gerenciamento de conexão persistente |
|  | **Axios 1.13** | Cliente HTTP para REST API com interceptors |
| **Banco de Dados** | **MongoDB 8** | Banco NoSQL orientado a documentos, ideal para dados não estruturados e escalabilidade horizontal |
| **DevOps** | **Docker Compose** | Orquestração de containers para MongoDB e Mongo Express |
|  | **Yarn Workspaces** | Monorepo com workspaces isolados e otimização de dependências |
|  | **Turbo** | Build system paralelo para desenvolvimento multi-pacote |
| **Documentação** | **Swagger/OpenAPI]** | Documentação automática de endpoints REST |

---

## 🏛️ Arquitetura

O projeto segue os princípios de **Clean Code, SOLID, DRY (Don't Repeat Yourself)** e **Separation of Concerns**. O frontend mobile utiliza **Atomic Design** para componentização, enquanto o backend segue a arquitetura modular do NestJS com **Controllers, Services, Gateways e Schemas**.

### Banco de Dados (Schema)

```typescript
// ========================================
// USER SCHEMA (Mongoose + NestJS)
// ========================================
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // Hash bcrypt

  @Prop({ default: null })
  avatar: string; // URL do avatar

  @Prop({ default: false })
  isOnline: boolean; // Status de conexão

  @Prop({ default: Date.now })
  lastSeen: Date;
}

// ========================================
// MESSAGE SCHEMA (Mongoose + NestJS)
// ========================================
@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  read: boolean; // Confirmação de leitura
}
```

### Estrutura de Pastas

```
halo-message-app/                    # 📦 Raiz do Monorepo
├── docker-compose.yml               # 🐳 Orquestração MongoDB + Mongo Express
├── package.json                     # 📄 Yarn Workspaces + Scripts root
│
├── halo-api/                        # 🟢 Backend (NestJS)
│   ├── src/
│   │   ├── main.ts                  # 🚀 Bootstrap da aplicação
│   │   ├── app.module.ts            # 📦 Módulo raiz
│   │   ├── seed.ts                  # 🌱 Script de seed (usuários fake)
│   │   ├── auth/                    # 🔐 Módulo de autenticação
│   │   │   └── auth.module.ts
│   │   ├── users/                   # 👥 Módulo de usuários
│   │   │   ├── users.controller.ts  # REST endpoints
│   │   │   ├── users.service.ts     # Lógica de negócio
│   │   │   ├── users.module.ts
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   └── schemas/
│   │   │       └── user.schema.ts   # Schema Mongoose
│   │   ├── chat/                    # 💬 Módulo de chat (WebSocket)
│   │   │   ├── chat.gateway.ts      # Gateway Socket.IO
│   │   │   ├── chat.service.ts      # Lógica de mensagens
│   │   │   ├── messages.controller.ts
│   │   │   ├── chat.module.ts
│   │   │   ├── dto/
│   │   │   └── schemas/
│   │   │       └── message.schema.ts
│   │   └── database/                # 🗄️ Configuração MongoDB
│   │       └── database.module.ts
│   ├── public/avatars/              # 🖼️ Avatares estáticos
│   ├── test/                        # 🧪 Testes E2E
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
└── halo/                            # 📱 Frontend Mobile (React Native CLI)
    ├── android/                     # 🤖 Código nativo Android
    ├── ios/                         # 🍎 Código nativo iOS
    ├── src/
    │   ├── components/              # 🧩 Componentes reutilizáveis
    │   │   ├── HaloAvatar/
    │   │   ├── HaloButton/
    │   │   ├── HaloCard/
    │   │   ├── HaloIcon/
    │   │   ├── HaloImage/
    │   │   ├── HaloInput/
    │   │   └── HaloText/
    │   ├── constants/
    │   │   └── colors.ts            # 🎨 Paleta de cores
    │   ├── modules/                 # 🏗️ Componentes Atomic Design
    │   │   ├── Login/
    │   │   │   ├── atoms/           # Componentes atômicos
    │   │   │   ├── molecules/       # Composição de atoms
    │   │   │   └── organisms/       # Componentes complexos
    │   │   ├── Users/
    │   │   │   ├── atoms/
    │   │   │   ├── molecules/
    │   │   │   └── organisms/
    │   │   ├── Chat/
    │   │   │   ├── atoms/
    │   │   │   ├── molecules/
    │   │   │   └── organisms/
    │   │   └── Settings/
    │   │       ├── atoms/
    │   │       ├── molecules/
    │   │       └── organisms/
    │   ├── navigation/              # 🧭 Configuração de rotas
    │   │   ├── AppNavigator.tsx     # Stack Navigator
    │   │   └── TabNavigator.tsx     # Bottom Tabs
    │   ├── screens/                 # 📄 Telas principais
    │   │   ├── Login/
    │   │   ├── Users/
    │   │   ├── Chat/
    │   │   └── Settings/
    │   ├── services/                # 🌐 Integração Backend
    │   │   ├── api.ts               # Cliente Axios
    │   │   ├── auth.ts              # Lógica de autenticação
    │   │   └── socket.ts            # Cliente Socket.IO
    │   ├── stores/                  # 🗃️ Zustand stores (state global)
    │   └── utils/                   # 🛠️ Funções auxiliares
    ├── App.tsx                      # 🏁 Entry point
    ├── index.js
    ├── package.json
    └── tsconfig.json
```

---

## 🗺️ Documentação da API

**Swagger/OpenAPI**

Toda a documentação dos endpoints da API será gerada automaticamente via **Swagger UI** integrado ao NestJS.

**Quando implementado, acesse em:** `http://localhost:3000/api/docs`

### Endpoints Atuais

#### **REST API**

| Método | Endpoint | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Registrar novo usuário | ✅ |
| `POST` | `/auth/login` | Fazer login e obter token JWT | ✅ |
| `GET` | `/users` | Listar todos os usuários | ✅ |
| `GET` | `/messages/:userId` | Obter histórico de mensagens com um usuário | ✅ |

#### **WebSocket Events (Socket.IO)**

| Evento | Direção | Payload | Descrição |
| :--- | :--- | :--- | :--- |
| `send_message` | Client → Server | `{ recipientId, content }` | Enviar mensagem |
| `new_message` | Server → Client | `{ senderId, recipientId, content, timestamp, read, _id }` | Receber mensagem |
| `mark_as_read` | Client → Server | `{ senderId }` | Marcar mensagens como lidas |
| `messages_read` | Server → Client | `{ userId, recipientId }` | Notificar leitura de mensagens |
| `user_status` | Server → Client | `{ userId, isOnline }` | Atualização de status online/offline |

---

## 🚀 Como Executar


Este guia assume que você já possui **Node.js 20+**, **Yarn**, **Docker**, **Android Studio/Xcode** e **React Native CLI** instalados.

> ⚠️ **Observação:** Execute todos os comandos a partir da **pasta raiz do projeto** (`halo-message-app/`).

### 1. Clonar o Repositório

```bash
git clone https://github.com/gabrielcostaaa/halo-message-app.git
cd halo-message-app
```

### 2. Instalar Dependências

Instale todas as dependências do monorepo (backend + mobile):

```bash
yarn install
```

**Para iOS** (apenas macOS), instale também os Pods:

```bash
yarn pod
```

### 3. Configuração de Ambiente (.env)

** Arquivo .env**

Crie um arquivo `.env` na raiz de `halo-api/` com as seguintes variáveis:

```bash
# halo-api/.env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/halo
JWT_SECRET=[GERAR_STRING_SEGURA]
JWT_EXPIRES_IN=7d
```

### 4. Iniciar Banco de Dados (Docker)

Suba os containers do MongoDB e Mongo Express:

```bash
yarn docker:up
```

**Verificar containers rodando:**
```bash
docker ps
```

**Acessar Mongo Express** (interface web do MongoDB):  
🌐 `http://localhost:8082`

### 5. Seed do Banco de Dados

Popule o banco com usuários de exemplo:

```bash
yarn seed
```

**Usuários criados:**
- `alice` / senha: `123456`
- `bruno` / senha: `123456`
- `carlos` / senha: `123456`
- `diana` / senha: `123456`
- `eduardo` / senha: `123456`

### 6. Rodando o Projeto

#### **Opção A: Aplicação Completa (Backend + Frontend)**

Para rodar todos os serviços simultaneamente:

```bash
yarn dev
```

Isso iniciará:
- 🟢 **Backend (NestJS)** em `http://localhost:3000`
- 📱 **Metro Bundler (React Native)** em `http://localhost:8081`

#### **Opção B: Somente Backend**

```bash
yarn api
```

#### **Opção C: Somente Frontend (Mobile)**

**1. Iniciar Metro Bundler:**
```bash
yarn mobile
```

**2. Em outro terminal, rodar no dispositivo/emulador:**

**Android:**
```bash
yarn android
```

**iOS (macOS apenas):**
```bash
yarn ios
```

### 7. Testando a Aplicação

1. **Inicie 2 emuladores/dispositivos** (ou 1 emulador + 1 físico)
2. **Faça login com usuários diferentes** em cada dispositivo (ex: `alice` e `bruno`)
3. **Envie mensagens** entre eles
4. **Observe:** Status online/offline, confirmações de leitura e mensagens em tempo real

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/gabrielcostaaa">Gabriel Costa</a>
</p>
