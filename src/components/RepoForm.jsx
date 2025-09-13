import React, { useState } from "react";

export default function RepoForm({ onGenerate, loading }) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    onGenerate(repoUrl.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      <input
        type="url"
        placeholder="Paste GitHub repository link"
        value={repoUrl}
        onChange={e => setRepoUrl(e.target.value)}
        required
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 16
        }}
        disabled={loading}
      />
      <button
        type="submit"
        style={{
          padding: "10px 18px",
          borderRadius: 6,
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer"
        }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}