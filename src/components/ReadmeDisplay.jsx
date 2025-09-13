import React from "react";

export default function ReadmeDisplay({ readme }) {
  return (
    <div style={{
      marginTop: 32,
      background: "#f9f9f9",
      borderRadius: 8,
      padding: 20,
      boxShadow: "0 1px 4px #0001"
    }}>
      <h2 style={{ marginBottom: 16 }}>Generated README.md</h2>
      <pre style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontFamily: "Menlo, Monaco, Consolas, monospace",
        fontSize: 15,
        background: "none",
        margin: 0
      }}>{readme}</pre>
    </div>
  );
}