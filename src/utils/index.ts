const GITHUB_API = "https://api.github.com";
const username = import.meta.env.VITE_GIT_USERNAME;
const token = import.meta.env.VITE_GIT_ACCESS_KEY;

const headers = {
  Authorization: `token ${token}`,
  Accept: "application/vnd.github.v3+json",
};

export async function getTotalRepos() {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, { headers });
    const data = await res.json();
    console.log(data)
    return data.public_repos || 0;
  } catch (error) {
    console.log(error.MESSAGE);
  }
}

export async function getFollowers() {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, { headers });
    const data = await res.json();
    return data.followers || 0;
  } catch (error) {
    console.log(error.MESSAGE);
  }
}

export async function getTotalStars() {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100`,
      { headers }
    );
    const repos = await res.json();

    let stars = 0;
    repos.forEach((repo) => {
      stars += repo.stargazers_count || 0;
    });

    return stars;
  } catch (error) {
    console.log(error.MESSAGE);
  }
}

export async function getTotalCommits() {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100`,
      { headers }
    );
    const repos = await res.json();

    let totalCommits = 0;

    for (const repo of repos) {
      const commitsRes = await fetch(
        `${GITHUB_API}/repos/${username}/${repo.name}/contributors`,
        { headers }
      );
      const contributors = await commitsRes.json();

      const self = contributors.find(
        (contributor) => contributor.login === username
      );
      totalCommits += self ? self.contributions : 0;
    }

    return totalCommits;
  } catch (error) {
    console.log(error.MESSAGE);
  }
}
