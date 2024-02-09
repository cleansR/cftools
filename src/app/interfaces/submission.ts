import { Problem } from "./problem";

export interface Submission {
  verdict : string,
  problem : Problem
}

export interface UserSubmissions {
  username : string,
  submissions : Submission[]
}
