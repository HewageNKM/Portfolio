import axios from "axios";

const GITHUB_API = "https://api.github.com";

// Use server-side environment variables
const username =
  process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
const token = process.env.GITHUB_TOKEN || "";

const headers = {
  Authorization: `token ${token}`,
  Accept: "application/vnd.github.v3+json",
};

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
}

interface GitHubContributor {
  login: string;
  contributions: number;
}

async function fetchUserData<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await axios.get<T>(endpoint, { headers });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching GitHub data:", error.message);
    } else {
      console.error("An unexpected error occurred fetching GitHub data");
    }
    return null;
  }
}

export const GithubService = {
  async getStats() {
    // Parallelize requests for performance
    const [userRes, reposRes] = await Promise.all([
      fetchUserData<GitHubUser>(`${GITHUB_API}/users/${username}`),
      fetchUserData<GitHubRepo[]>(
        `${GITHUB_API}/users/${username}/repos?per_page=100`
      ),
    ]);

    const publicRepos = userRes?.public_repos || 0;
    const followers = userRes?.followers || 0;

    let totalStars = 0;
    if (reposRes) {
      totalStars = reposRes.reduce(
        (total: number, repo: GitHubRepo) =>
          total + (repo.stargazers_count || 0),
        0
      );
    }

    let totalCommits = 0;
    if (reposRes) {
      // Limited concurrent requests could be better, but keeping sequential for safety regarding rate limits
      for (const repo of reposRes) {
        try {
          const commitsRes = await fetchUserData<GitHubContributor[]>(
            `${GITHUB_API}/repos/${username}/${repo.name}/contributors`
          );
          if (commitsRes) {
            const self = commitsRes.find(
              (c: GitHubContributor) => c.login === username
            );
            totalCommits += self?.contributions || 0;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    return {
      repos: publicRepos,
      followers: followers,
      stars: totalStars,
      commits: totalCommits,
    };
  },
};
