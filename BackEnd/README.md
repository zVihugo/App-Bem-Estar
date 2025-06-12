# API AppBemEstar

## Comandos para instalar e rodar o projeto

1. **Instalar Node.js e NPM:**

   - Acesse o site oficial do Node.js: [nodejs.org](https://nodejs.org/)
   - Clique no botão para baixar a versão recomendada.
   - Siga as instruções de instalação.
   - Para verificar se o Node.js foi instalado corretamente, abra o terminal (ou prompt de comando no Windows) e digite:
     ```sh
     node -v
     npm -v
     ```
     Você deve ver a versão do Node.js e do NPM (Node Package Manager) aparecer.

2. **Clonar o Repositório**

   - Abra o terminal (ou prompt de comando no Windows) e navegue até a pasta
   - Digite o comando para clonar o repositório:
     ```sh
     git clone https://github.com/zVihugo/App-Bem-Estar.git
     ```
   - Instale as dependências usando o NPM:
     ```sh
     npm install
     ```

3. **Gerar schema do Prisma**

   - Acesse a pasta do projeto e execute o comando para gerar o schema do Prisma
     ```sh
     npx prisma generate
     ```

4. **Criar um arquivo .env**

   - Crie um arquivo chamado `.env` na raiz do projeto comforme o arquivo `.env.example`

   4. **Rodar o projeto**

   - No terminal, ainda na pasta do projeto, inicie o servidor:
     ```sh
     npm run dev
     ```

5. **Criando o Usuário Administrador (Seed)**

   - No terminal, ainda na pasta do projeto, execute o comando para criar o usuário administrador:

     ```sh
     npx prisma db seed
     ```

     Esse comando:

     Verifica se já existe um usuário com o email admin@admin.com.

     Caso não exista, cria automaticamente o administrador com os seguintes dados:

     | Campo | Valor             |
     | ----- | ----------------- |
     | Email | `admin@admin.com` |
     | Senha | `admin123`        |
     | Nome  | `Administrador`   |
     | Role  | `ADMIN`           |

     > A senha é criptografada antes de ser salva no banco.
