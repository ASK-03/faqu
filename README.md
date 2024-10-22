# FAQ-U Chat-bot for SARAS-AI

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributors](#contributors)


## Introduction
This is a chatbot for answering FAQs related to SARAS AI Institute.

## Features
- Functional Chatbot.
- Retrieval Augmented Generation using VectorDB.
- Authentication.
- Personalised chat saving using Relational DB.
- Easily Integrable Chatbot

## Technologies Used

  - next.js
  - prisma orm
  - qdrant vector-db
  - typescript
  - tailwindcss
  - shadcn

## Installation
```bash
npm i

ollama pull mxbai-embed-large

sudo docker compose up -d

npx prisma generate
npx prisma db push

sudo docker pull qdrant/qdrant

sudo docker run -p 6333:6333 -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage:z \
  qdrant/qdrant

npm run dev
```
## Contributors

- Abhishek Singh Kushwaha
- Atharva Bhatnagar
- Ayudh Avinash Abhale
- Nikhil Kumar Shrey
