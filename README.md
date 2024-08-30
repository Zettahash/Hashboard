# Zettahash Hashboard Frontend

[Hashboard Application](https://hashboard.zettahash.org/)

[Preview Builds](https://hashboard-preview.zettahash.org/)


![Deployment Badge](https://img.shields.io/badge/Current_Deployment_Environment-Cloudflare-orange)

The Zettahash Hashboard Frontend is a crucial component of the Zettahash DAO, designed to ensure transparency and accessibility of project information for users. This frontend provides comprehensive data on financials, computational power, hashrate, profitability, market trends, tokenholder statistics, governance proposals powered by Snapshot, and communication channels.

## Table of Contents

- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
  - [Linting](#linting)
  - [Configuration](#configuration)
- [Environment Configuration](#environment-configuration)
- [Development Journal](#development-journal)
- [Hashboard Ethos](#hashboard-ethos)
- [Features](#features)
  - [Data Views](#data-views)
  - [Communication](#communication)
  - [Interaction](#interaction)
  - [Implementation TODO](#implementation-todo)
- [Contribution Guidelines](#contribution-guidelines)
- [Dispersed Log](#dispersed-log)
- [License](#license)
- [Contact](#contact)

## Project Setup

We utilise Vite for frontend tooling.

### Prerequisites

- Node.js v20

### Installation

Install dependencies with:

```sh
npm install
```

### Development

Compile and hot-reload for development:

```sh
npm run dev
```

### Production

Compile and minify for production:

```sh
npm run build
```

### Linting

Lint and fix files:

```sh
npm run lint
```

### Configuration

See the [Vite Configuration Reference](https://vitejs.dev/config/).

## Environment Configuration

Specify the backend server in your `.env` file. You can choose between a local server or the main full server.

Example `.env` file:

```dotenv
# Set to 'locallost' for local backend server or 'https://zettahash_hashboard_middleware.zetta-735.workers.dev' for the main full server
VITE_MIDDLEWARE_URL=http://localhost:3000
```

## Development Journal

This section documents ongoing changes and features of the Hashboard. Note that the organisation of this document will evolve over time.

## Hashboard Ethos

The Hashboard is committed to providing transparent access to Zettahash operational data and financials for investors and shareholders, adhering to Zettahash DAO policies.

## Features

### Data Views

- Linecoin mining data graphs and information tiles
- Ocean mining embedded dashboard
- Dextools market graphs and exchange links for ZH on dextools.io
- ETH, ZH, USDT, BTC core wallet balances
- Hedgey vesting details for core wallets
- User wallet balances, ENS viewing, and disconnect options
- Snapshot spaces and proposals

### Communication

- Reddit-style forum
- Link to Discord server
- Link to Telegram group

### Interaction

- Purchase ZH (Beneficiary)

### Implementation TODO

- Cast votes on proposals directly from the Hashboard
- View connected wallet vesting details
- Create a dashboard with real gauges and graphs (for demonstration purposes)

## Contribution Guidelines

We welcome contributions to the project. Please follow these steps for a smooth contribution process:

1. **Fork the Repository:** Fork the repo to your GitHub account.
2. **Push Changes to Your Fork:** Implement your changes in the forked repository.
3. **Create a Pull Request:** Submit a PR to the main repository.
4. **Discuss Changes in Consensus Chat:** Engage in discussions about the changes.
5. **Proposal on Snapshot:** Create a detailed proposal on Snapshot outlining the changes and objectives for merging the branch.

## Dispersed Log

This log chronicles significant changes across the ZH technical framework.

- CDN: Updated Zettahash DAO Token symbol name for add-to-metamask function
- Hashboard components built after April 2024 should use Composition API
- Frontend tooling upgraded to Vite

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

For questions or support, please contact the Zettahash team at [development@zettahash.org](mailto:development@zettahash.org).

Thank you for using Zettahash Hashboard!

---

This README file was last updated on 24 June 2024.
 