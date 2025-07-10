Sure — here’s a **README.md** file for your project based on what you've built so far (ChromaDB + LangChain + Hugging Face LLM + Express + EJS + Socket.io, with frontend/backend separation and RAG pipeline):

---

````markdown
# 🧠 CodeSage — AI Codebase Assistant

**CodeSage** is an AI-powered codebase assistant that lets you chat with your project using RAG (Retrieval Augmented Generation). It uses:

- **LangChain** for orchestration
- **ChromaDB** (standalone) for vector storage
- **Hugging Face Inference API** for LLM and embeddings
- **Express.js** for the backend
- **EJS + Socket.IO** for the real-time chat frontend

---

## 🚀 Features

- Select a local codebase
- Embed and store code files in ChromaDB
- Query your codebase with natural language
- Real-time streaming LLM responses
- Fully local vector search (ChromaDB standalone)
- Configurable Hugging Face models for embeddings and LLMs

---

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/codesage.git
cd codesage
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### 4. Run the app

```bash
npm start
```

> The app runs on `http://localhost:3000`

---

## 🧪 Usage

1. Open the app in browser
2. Select a folder containing a Node.js project
3. The codebase will be scanned and embedded
4. Ask any question about the project in chat
5. Responses are streamed in real time

---

## 🛠 Project Structure

```
.
├── routes/                 # Express routes
├── services/              # Vector DB, embeddings, LLM logic
├── public/                # Static JS/CSS
├── views/                 # EJS templates
├── app.js                 # Express server entry
├── .env                   # API keys and config
```

---

## 🚧 Further Improvements

* [ ] Add support for multi-language codebases (Python, Go, etc.)
* [ ] Implement chat history storage
* [ ] Add user authentication
* [ ] Live codebase reindexing on file change (via chokidar)
* [ ] LLM model selector and prompt tuning
* [ ] TypeScript conversion for better dev experience
* [ ] Drag-and-drop folder selection in frontend

---

## 💬 Feedback

Feel free to open issues or suggestions — this is an evolving tool and feedback is welcome.

---

## 📄 License

MIT License © 2025 Sarim

```

---

Let me know if you'd like a version with images, badges, or a demo GIF.
```
