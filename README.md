# Zettahash #Hashboard Frontend

![badge](https://img.shields.io/badge/Current_Deployment_Environment-Couudflare-orange)


We use Vite frontend tooling.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Development Journal

### This is the beginning of documenting changes and current features of the Hashboard (Organisation of this document WILL change).

## Hashboard Ethos
Hashboard must facilitate investors' and shareholders' transparent access to Zettahash operational data and finances within the limits of Zettahash DAO policy.

## Features
### Data Views
- ~~Linecoin mining available data graphs and information tiles~~
- ~~Ocean mining embedded dashboard~~
- ~~Dextools Markets graph & link to exchange ZH on dextools.io~~
- ETH, ZH, USDT, BTC (core wallet) balances
- Hedgey vesting (for core wallets)
- User wallet balances, disconnect, view ens
- Snapshot spaces, proposals

### Communication
- ~~Reddit-style forum~~
- ~~Link to discord server~~
- Link to telegram group

### Interaction
- Purchase ZH (Beneficiary)

### Implementation TODO
- Cast vote on proposals directly from hashboard
- View connected wallet vesting details
- create dashboard of real gauges and graphs (for demo purposes)

## Dispersed Log
This log attempts to chronicle significant changes across all components of the ZH technical framework.

- CDN - update Zettahash Dao Token symbol name for add-to-metamask function
- Hashboard components built after April 2024 should use Composition API
- Frontend tooling upgraded to vite