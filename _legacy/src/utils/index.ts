const GITHUB_API = "https://api.github.com";
const username = import.meta.env.VITE_GIT_USERNAME;
const token = import.meta.env.VITE_GIT_ACCESS_KEY;

const headers = {
  Authorization: `token ${token}`,
  Accept: "application/vnd.github.v3+json",
};

// Helper function to fetch user data
//@ts-ignore
async function fetchUserData(endpoint) {
  try {
    const res = await fetch(endpoint, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    //@ts-ignore
    console.error("Error fetching GitHub data:", error.message);
    return null;
  }
}

export async function getTotalRepos() {
  const data = await fetchUserData(`${GITHUB_API}/users/${username}`);
  return data ? data.public_repos || 0 : 0;
}

export async function getFollowers() {
  const data = await fetchUserData(`${GITHUB_API}/users/${username}`);
  return data ? data.followers || 0 : 0;
}

export async function getTotalStars() {
  const repos = await fetchUserData(`${GITHUB_API}/users/${username}/repos?per_page=100`);
  if (!repos) return 0;

  //@ts-ignore
  return repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
}

export async function getTotalCommits() {
  const repos = await fetchUserData(`${GITHUB_API}/users/${username}/repos?per_page=100`);
  if (!repos) return 0;

  let totalCommits = 0;

  // To avoid multiple API calls for each repo's contributors, consider limiting the repositories or using pagination.
  for (const repo of repos) {
    const commitsRes = await fetchUserData(
      `${GITHUB_API}/repos/${username}/${repo.name}/contributors`
    );
    if (commitsRes) {
      //@ts-ignore
      const self = commitsRes.find((contributor) => contributor.login === username);
      totalCommits += self ? self.contributions : 0;
    }
  }

  return totalCommits;
}
