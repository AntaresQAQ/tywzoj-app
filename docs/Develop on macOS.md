# Development Guide on macOS

Required:

- Command Line Tools for Xcode
- [Node.js](https://nodejs.org/) v18 (recommended to use [NVM](https://github.com/nvm-sh/nvm))

- [Yarn](https://yarnpkg.com/)

## Setup environment
1. Install Command Line Tools

   ```sh
   xcode-select --install
   ```

2. Install [Homebrew](https://brew.sh/). If you are in **mainland China**, it is recommended to follow [this tutorial](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/).

3. Install NVM and use Node.js v18.

   ```sh
   brew install nvm
   ```

   Add the following to your shell profile e.g. `~/.profile` or `~/.zshrc`:

   ```sh
   export NVM_DIR="$HOME/.nvm"
   [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
   [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
   ```

   Reopen a shell or run command `sources ~/.zshrc`

   Install Node.js v18.

   ```sh
   nvm install 18
   nvm use 18
   ```

   If you don't want to use NVM, follow the command below:

   ```sh
   brew install node@18
   ```

4. Install Yarn with Homebrew or NPM.

   Using Homebrew(recommended):

   ```sh
   brew install yarn
   ```

   Using NPM:

   ```sh
   npm install -g yarn
   ```

5. Install [Visual Studio Code](https://code.visualstudio.com/).

   ```sh
   brew install --cask visual-studio-code
   ```

## Fork and clone the git repository

1. Fork the repository on GitHub.

2. Clone your own repository.

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

```
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

   
