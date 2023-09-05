# Development Guide on macOS

Required:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) v18 (recommended to use [NVM](https://github.com/nvm-sh/nvm))

- [Yarn](https://yarnpkg.com/)

## Setup environment

1. Download and install Git from <https://git-scm.com/downloads>.

2. Download and install NVM. <https://github.com/coreybutler/nvm-windows>

3. Install Node.js v18 and Yarn.

   ```sh
   nvm install 18
   nvm use 18
   npm install -g yarn
   ```

4. Install [Visual Studio Code](https://code.visualstudio.com/).


## Fork and clone the git repository

1. Fork the repository on GitHub.

2. Open git bash and clone your own repository.

   ```sh
   git clone git@github.com:<Your github id>/tywzoj-app.git
   ```

## Install dependencies and initialize locale strings.

```sh
cd tywzoj-app
yarn
yarn run locstring
```

## Build and start a dev server

```sh
yarn build
yarn fast-dev
```

## Make a code change

1. Create yourself dev branch

   ```sh
   git checkout -b <Your branch name>
   ```

2. Open workspace in Visual Studio Code.

   ```sh
   code workspace.code-workspace
   ```

3. Change you code and commit your changes.

   ```sh
   git commit -m "<Commit message>"
   ```

   You may be asked to do some settings. If you commit for the first time, please run the following command and commit again.

   ```sh
   git config user.name "<Your name>"
   git config user.email "<Your email>"
   ```

4. Push your change and create a pull request on GitHub.

   ```sh
   git push
   ```
