import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchRepoDetails(repoUrl) {
  repoUrl = repoUrl.replace(/\.git$/, '').replace(/\/$/, '');
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)$/);
  if (!match) throw new Error("Invalid GitHub URL");
  const [_, owner, repo] = match;

  const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const repoRes = await fetch(apiUrl, { headers });
  if (!repoRes.ok) {
    const errorText = await repoRes.text();
    console.log("GitHub API error:", errorText);
    throw new Error("GitHub repo not found");
  }
  const repoData = await repoRes.json();

  const branchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches/${repoData.default_branch}`, { headers });
  if (!branchRes.ok) {
    const errorText = await branchRes.text();
    console.log("GitHub Branch API error:", errorText);
    throw new Error("Could not fetch branch info");
  }
  const branchData = await branchRes.json();
  const sha = branchData.commit.sha;

  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`,
    { headers }
  );
  if (!treeRes.ok) {
    const errorText = await treeRes.text();
    console.log("GitHub Tree API error:", errorText);
    throw new Error("Could not fetch repo structure");
  }
  const treeData = await treeRes.json();

  return {
    title: repoData.name,
    description: repoData.description,
    owner,
    repo,
    license: repoData.license?.name || "No license",
    techStack: repoData.language,
    structure: treeData.tree?.map(f => f.path).slice(0, 20),
  };
}