## Prerequesites

-   Node
-   [nvm](https://github.com/nvm-sh/nvm) - recommended to install and manage node versions. See .nvmrc for current node version.
-   [pnpm](https://pnpm.io/installation) - node package manager, but faster

```bash
nvm use
```

### Install dependencies

```bash
pnpm install
```

## Start the server

```bash
node app.js
```

## Maintenance

If you wish to change the port or bucket, they are hardcoded in the consts PORT and BUCKET.
(pretty self-explanatory)