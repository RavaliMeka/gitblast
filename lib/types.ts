// The JSON the API returns and the pages render. Shared by server and browser.

type FileStatus = "added" | "modified" | "removed" | "renamed";
export type Role = "source" | "test" | "config" | "deps" | "ci" | "docs" | "data" | "asset";
export type Level = "high" | "medium" | "low";

interface RepoSummary {
  owner: string;
  repo: string;
  description: string | null;
  stars: number;
}

export type ChangeKind = "pr" | "commit" | "compare";

export interface PRFile {
  path: string;
  previous?: string;
  status: FileStatus;
  additions: number;
  deletions: number;
  role: Role;
  lang: string;
  color: string;
  /** Files in this PR that import this one (directly or not). Used for review order. */
  usedBy: number;
  /** Files outside the PR that this one reaches. */
  reach: number;
}

export interface Impacted {
  path: string;
  depth: 1 | 2 | 3;
  /** The changed file this one depends on. */
  via: string;
  test: boolean;
}

export interface Risk {
  id: string;
  level: Level;
  title: string;
  detail: string;
  files: string[];
}

export interface PRReport {
  repo: RepoSummary;
  pr: {
    /** What produced the change. Commits and comparisons reuse the pull request report. */
    kind: ChangeKind;
    /** Short name for a commit or comparison, e.g. "7f3e9a1" or "main...feature". */
    ref: string;
    /** 0 unless `kind` is "pr". */
    number: number;
    title: string;
    author: string;
    state: "open" | "closed" | "merged";
    draft: boolean;
    base: string;
    head: string;
    headSha: string;
    createdAt: string;
    additions: number;
    deletions: number;
    commits: number;
    changedFiles: number;
  };
  score: number;
  level: Level;
  summary: string[];
  files: PRFile[];
  impacted: Impacted[];
  impactedTotal: number;
  tests: { changed: string[]; affected: string[] };
  risks: Risk[];
  areas: { name: string; changed: number; impacted: number }[];
  /** Files per area across the whole repository, affected or not. */
  areaTotals: Record<string, number>;
  edges: [string, string][];
  analysis: { complete: boolean; filesScanned: number; note?: string };
  generatedAt: string;
}

export interface Frame {
  sha: string;
  date: string;
  author: string;
  message: string;
  /** 1-based position of this commit in the branch history. */
  index: number;
  files: number;
  bytes: number;
  /** Folder, two levels deep → number of files in it and below. */
  dirs: Record<string, number>;
  /** Language name → number of files. */
  langs: Record<string, number>;
}

export interface Milestone {
  frame: number;
  label: string;
  kind: "folder" | "language" | "growth" | "cleanup";
  /** The folder or language the moment is about, when there is one. */
  key?: string;
}

export interface Timelapse {
  repo: RepoSummary & {
    defaultBranch: string;
    createdAt: string;
    language: string | null;
    license: string | null;
    forks: number;
  };
  totalCommits: number;
  frames: Frame[];
  milestones: Milestone[];
  contributors: { login: string; contributions: number }[];
  langColors: Record<string, string>;
  partial: boolean;
  generatedAt: string;
}

/** The import graph of a whole repository at its default branch. */
export interface RepoMap {
  repo: RepoSummary & { defaultBranch: string };
  /** The commit the map was read at. */
  sha: string;
  /** Every file that imports or is imported by another. Edges index into this list. */
  files: string[];
  /** [importer, imported] pairs. */
  edges: [number, number][];
  /** The files the most other files depend on, most load-bearing first. */
  top: { path: string; reach: number; direct: number }[];
  /** Files per area across the whole repository. */
  areaTotals: Record<string, number>;
  filesScanned: number;
  partial: boolean;
  generatedAt: string;
}

export interface PullSummary {
  number: number;
  title: string;
  author: string;
  updatedAt: string;
  draft: boolean;
}

export interface ApiError {
  error: { code: string; message: string; retryAfter?: number };
}
