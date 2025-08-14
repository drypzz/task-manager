# Gerenciador de Tarefas

## 📄 Sobre o Projeto

Este é um projeto de uma **Single Page Application (SPA)** construída com **React** para exibir e gerenciar uma lista de tarefas com grande volume de dados. A aplicação foi projetada para ser performática, responsiva e com uma excelente experiência de usuário, utilizando ferramentas modernas do ecossistema JavaScript.

O projeto inclui funcionalidades completas de CRUD, filtros dinâmicos e paginação.

---

## ✨ Funcionalidades

-   **CRUD:** Adição, visualização de detalhes, edição e exclusão de tarefas.
-   **Listagem:** Utiliza `react-window` para renderização virtualizada, garantindo alta performance com milhares de registros.
-   **Filtros:** Filtro por status da tarefa (Concluída, Em Andamento, Atrasada, etc.) e campo de busca por título.
-   **Paginação:** Controle de itens exibidos por página (25, 50, 100) e botões de navegação.
-   **Roteamento:** Navegação entre a lista principal e a tela de detalhes de cada tarefa com **React Router**.
-   **Design:** Interface construída com **Styled Components**, incluindo um sistema de temas e layout que se adapta a diferentes tamanhos de tela.
-   **Testes Unitários:** Cobertura de testes para componentes críticos utilizando **Jest** e **React Testing Library**.

---

## 🚀 Tecnologias Utilizadas

-   **React:** Biblioteca principal para a construção da interface.
-   **Zustand:** Gerenciador de estado global.
-   **Styled Components:** Para estilização de componentes de forma isolada e dinâmica.
-   **React Router:** Para o gerenciamento das rotas da aplicação.
-   **React Window** & **React Virtualized Auto-Sizer:** Para otimização de performance em listas grandes.
-   **React Icons:** Para a utilização de ícones vetoriais.
-   **Framer Motion:** Para animações fluidas na interface.
-   **Axios:** Para realizar as chamadas à API.
-   **JSON Server:** Para simular uma API RESTful de forma rápida.
-   **Jest** & **React Testing Library:** Para a escrita e execução dos testes unitários.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### **Pré-requisitos**

-   **Node.js** (versão 16 ou superior)
-   **npm** (ou **yarn**)

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone [git@github.com:drypzz/task-manager.git](https://github.com/drypzz/task-manager)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd task-manager
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### **Execução**

Para rodar a aplicação, você precisará de **dois terminais abertos** na pasta do projeto.

1.  **Terminal 1: JSON Server**

    Este comando irá iniciar um servidor fake na porta `3001` que servirá os dados do arquivo `db.json`.
    ```bash
    npm run api
    ```
    Você deverá ver uma mensagem indicando que o servidor está rodando.

2.  **Terminal 2: Aplicação**

    Este comando iniciará o servidor de desenvolvimento do React na porta `3000` e abrirá a aplicação no seu navegador.
    ```bash
    npm start
    ```

Agora a aplicação estará rodando e se comunicando com a API mock.

---

## 🧪 Rodando os Testes

O projeto utiliza Jest e React Testing Library para os testes unitários. Para executá-los, use o seguinte comando:

```bash
npm test
```

Este comando iniciará o executor de testes em modo de observação (watch mode), que re-executa os testes automaticamente ao salvar uma alteração nos arquivos.

---

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para promover a separação de responsabilidades e a escalabilidade:

```
/src
|-- /api           # Mock da API com JSON Server
|-- /components    # Componentes reutilizáveis (Button, CustomSelect, etc.)
|-- /hooks         # Hooks customizados com a lógica de negócio
|-- /pages         # Componentes que representam as páginas da aplicação
|-- /store         # Configuração do estado global (Zustand)
|-- /tests         # Arquivos de teste
|-- /theme         # Definição do tema (cores, fontes, etc.)
|-- App.jsx        # Componente principal com as rotas
|-- globalStyles.js # Estilos globais da aplicação
|-- index.js       # Ponto de entrada da aplicação

> by drypzz