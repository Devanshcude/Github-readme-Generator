import express from "express";
import cors from "cors";
import { fetchRepoDetails } from "./github.js";
import { generateReadmeSections } from "./gemini.js";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-readme", async (req, res) => {
  const { repoUrl } = req.body;
  try {
    const repoData = await fetchRepoDetails(repoUrl);
    const readmeSections = await generateReadmeSections(repoData);
    res.json({ readme: readmeSections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));