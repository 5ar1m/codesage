# 🧠 CodeSage — AI Codebase Assistant

CodeSage is an AI assistant for your codebase using Retrieval-Augmented Generation (RAG). It utilize LangChain, ChromaDB (local), Hugging Face and Google's chat Models to provide real-time, context-aware answers about your Node.js projects.

---

## 📦 Features

* Folder selection and project indexing
* Embedding code files into ChromaDB using Hugging Face Models
* Git integration to avoid redundant embedding updates
* Querying the codebase via chat
* Streaming responses using Google's chat Models
* EJS frontend with real-time Socket.io integration

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/5ar1m/codesage.git
cd codesage
```

### 2. Install and run ChromaDB (Standalone)

In the project root:

```bash
pip install chromadb
chromadb run
```

> Make sure Python and pip are installed on your system.

### 3. Install dependencies

```bash
npm install
```

### 4. Add environment variables

Create a `.env` file in the root:

```
HF_API_TOKEN=your_huggingface_api_key
GOOGLE_API_KEY=your_google_api_key
```

---

## 🚀 Running the app

```bash
npm start
```

Then open your browser:

```
http://localhost:3000
```

---

## 🧠 How It Works

1. Select a codebase folder from the frontend.
2. Backend scans, chunks, and embeds files using a Hugging Face embedding model.
3. ChromaDB stores the embeddings locally.
4. When a user enters a query, embeddings are generated and used to search for relevant context.
5. The context is passed to a Google chat model via API, and the response is streamed back using Socket.io.

---

## 🔄 Future Improvements

* Multi-language support beyond Node.js
* Persistent chat history per project
* UI options to choose LLMs and model settings (you can even build a full blown extension for some IDEs like sublime text)
* Drag-and-drop UI for codebase selection
* Cache the context aware inputs with llm response to save quick bucks 😁 !
* You can also include previous interactions for context awareness
---

## 📝 License

MIT © 2025 Sarim
