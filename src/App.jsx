import React, { useState } from "react";
import RepoForm from "./components/RepoForm";
import ReadmeDisplay from "./components/ReadmeDisplay";

export default function App() {
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (repoUrl) => {
    setLoading(true);
    setError("");
    setReadme("");
    try {
      const res = await fetch("http://localhost:5000/api/generate-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setReadme(data.readme);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 2px 12px #0001",
      background: "#fff"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>GitHub README Generator</h1>
      <RepoForm onGenerate={handleGenerate} loading={loading} />
      {loading && <p style={{ textAlign: "center" }}>Generating README...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {readme && <ReadmeDisplay readme={readme} />}
    </div>
  );
}