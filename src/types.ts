export interface UserListGithub {
    avatar_url: string;
    login: string;
    id: number;
    repos_url: string;
    company: string;
    count?: number;
}

// "https://api.github.com/users/mojombo"

export interface UserGithub {
    id: number;
    name: string;
    avatar_url: string;
    login: string;
    blog: string;
    followers: string;
    following: string;
}

// https://api.github.com/users/mojombo/repos

export interface Repository {
    html_url: string;
    id: number;
    name: string;
    description: string;
}

// https://api.github.com/users/mojombo/orgs
