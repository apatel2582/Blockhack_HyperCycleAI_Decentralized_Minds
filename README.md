# **ChatGBC - AI Audit your Smart Contracts - Blockhack HyperCycleAI - Decentralized Minds**

A platform that leverages GPT AI API for auditing smart contracts.

## **Table of Contents**

- [**ChatGBC - AI Audit your Smart Contracts - Blockhack HyperCycleAI - Decentralized Minds**](#chatgbc---ai-audit-your-smart-contracts---blockhack-hypercycleai---decentralized-minds)
  - [**Table of Contents**](#table-of-contents)
  - [**Setup**](#setup)
  - [**Running the Project**](#running-the-project)
  - [**Docker Note**](#docker-note)
  - [**Environment Variables**](#environment-variables)
  - [**Contributors**](#contributors)
  - [**Acknowledgements**](#acknowledgements)

## **Setup**

1. **Prerequisites**:

   - Ensure you have `node` and `npm` installed. If not, download and install them from [here](https://nodejs.org/).
   - A code editor of your choice.

2. **Install Dependencies**:
   - Navigate to both the frontend (`BlockHack-Frontend`) and backend (`smartcontract-analyzer`) folders separately and run the following:
     ```bash
     npm install
     ```

## **Running the Project**

Since Dockerization is currently facing issues, the recommendation is to run the backend and frontend separately using two terminals.

1. **Backend**:

   - Navigate to the `smartcontract-analyzer` folder.
   - Run the command:
     ```bash
     node server.js
     ```
   - The backend should start at `localhost:3000`.

2. **Frontend**:
   - Navigate to the `BlockHack-Frontend` folder.
   - Run the command:
     ```bash
     npm start
     ```
   - Since the backend occupies `localhost:3000`, the frontend should start at `localhost:3001`.

## **Docker Note**

Although Docker files are provided, currently only the backend is accessible at `localhost:3000` when using Docker. The frontend faces issues. Thus, it's recommended not to use Docker for now.

## **Environment Variables**

For the backend to function properly, you need to set up environment variables:

1. **Without Docker**:

   - Create a `.env` file in the `smartcontract-analyzer` folder with the following content:
     ```env
     OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
     PORT=3000
     ```

2. **With Docker** (not recommended at the moment):
   - Create a `.env` file in the `smartcontract-analyzer` folder with just the API key:
     ```env
     OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
     ```

## **Contributors**

- Anishkumar Patel
- Kevon Jaggassar
- Sufiyan Memon
- Xiaogang Dong
- Umut Yorulmaz

## **Acknowledgements**

Made with ❤️ by the Decentralized Minds - GBC Blockchain Club.
