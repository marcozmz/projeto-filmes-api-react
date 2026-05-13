# 🎬 Catálogo de Filmes

Aplicação CRUD desenvolvida em **React** para gerenciamento de um catálogo de filmes, utilizando **MockAPI** como servidor de dados simulado.

---

## 📋 Sobre o Projeto

Este projeto permite cadastrar, visualizar, editar e excluir filmes de um catálogo. Os dados são persistidos remotamente via MockAPI, dispensando qualquer servidor local.

### Dados armazenados por filme:
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Auto | Gerado automaticamente pelo MockAPI |
| `nome` | String | Nome do filme |
| `genero` | String | Gênero do filme |
| `ano` | String | Ano de lançamento |

---

## 🛠️ Tecnologias Utilizadas

- **React 19** — biblioteca de interface
- **React Router Dom 7** — navegação entre páginas (SPA)
- **Axios** — requisições HTTP para a API
- **Vite** — bundler e servidor de desenvolvimento
- **MockAPI** — servidor REST simulado na nuvem

---

## 📁 Estrutura de Pastas

```
catalogo-filmes/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx        # Barra de navegação
│   ├── pages/
│   │   ├── Inicio.jsx        # Lista todos os filmes
│   │   ├── Ler.jsx           # Exibe detalhes de um filme
│   │   ├── Criar.jsx         # Formulário para novo filme
│   │   ├── Alterar.jsx       # Busca e edita um filme
│   │   └── Apagar.jsx        # Busca e exclui um filme
│   ├── api.js                # Configuração do Axios + URL do MockAPI
│   ├── App.jsx               # Rotas da aplicação
│   ├── main.jsx              # Ponto de entrada React
│   └── index.css             # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

---

## 🗺️ Páginas e Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Início | Lista ID e nome de todos os filmes cadastrados |
| `/ler/:id` | Ler | Exibe todos os dados do filme selecionado |
| `/criar` | Criar | Formulário para cadastrar um novo filme |
| `/alterar` | Alterar | Busca por ID e edita os dados do filme |
| `/apagar` | Apagar | Busca por ID e confirma a exclusão do filme |

---

## ⚙️ Configuração do MockAPI

1. Acesse [https://mockapi.io](https://mockapi.io) e crie uma conta
2. Crie um novo projeto
3. Adicione um recurso chamado **`filmes`** com os campos:
   - `nome` (String)
   - `genero` (String)
   - `ano` (String)
4. Copie a URL gerada e cole em `src/api.js`:

```js
const BASE_URL = 'https://SEU_ID.mockapi.io/filmes';
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)

### Passo a passo

```bash
# 1. Clone ou extraia o projeto
cd catalogo-filmes

# 2. Instale as dependências
npm install

# 3. Configure a URL do MockAPI em src/api.js

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: **http://localhost:5173**

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `/dist` |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Analisa o código com ESLint |

---

## 🔄 Renderização Condicional (Alterar e Apagar)

As páginas **Alterar** e **Apagar** possuem 3 estados distintos:

```
[ busca ] ──► ID encontrado   ──► [ formulário / confirmação ]
           └► ID não encontrado ──► [ mensagem de erro ]
```

O formulário de edição ou a tela de confirmação só aparecem **após** o usuário buscar um ID válido.

---

## 🌐 Operações da API

| Operação | Método HTTP | Endpoint |
|---|---|---|
| Listar todos | `GET` | `/filmes` |
| Buscar um | `GET` | `/filmes/:id` |
| Criar | `POST` | `/filmes` |
| Editar | `PUT` | `/filmes/:id` |
| Apagar | `DELETE` | `/filmes/:id` |