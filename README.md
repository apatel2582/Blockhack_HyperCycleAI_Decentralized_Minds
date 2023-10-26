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
     npm start
     ```
   - The backend should start at `localhost:3000`.

2. **Frontend**:
   - Navigate to the `BlockHack-Frontend` folder.
   - Run the command:
     ```bash
     npm start
     ```
   - backend - `localhost:3000`, the frontend - `localhost:3001`.

## **Docker Note**

  - Make sure to have Docker Desktop installed and docker as a Environmental PATH variable.
  - Docker Support arrived. `docker-compose up --build` From the main directory.
  - Make sure to `docker-compose down -v` to stop and delete volumes and containers.
  - Try to delete unused images to make space.

## **Environment Variables**

For the backend to function properly, you need to set up environment variables:

1. **Without Docker**:

   - Create a `.env.local` file in the `smartcontract-analyzer` folder with the following content:
     ```env
     OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
     PORT=3000
     UPLOAD_PATH=
     ```

2. **With Docker** (not recommended at the moment):
   - Create a `.env.docker` file in the `smartcontract-analyzer` folder with the following content:
     ```env
     OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
     PORT=3000
     UPLOAD_PATH=uploads/
     ```

## **Contributors**

- Anishkumar Patel
- Kevon Jaggassar
- Sufiyan Memon
- Xiaogang Dong
- Umut Yorulmaz

## **Acknowledgements**

Made with ❤️ by the members of the Decentralized Minds - the GBC Blockchain Club.
