import { Contest } from "./contest"

export enum ContestParticipation {
  ANY,
  NO_SUBMISSIONS,
  NO_SOLVED
}

export interface ContestSearchSettings {
  usernames : string[],
  divisions : number[],
  pariticipation : ContestParticipation
}

export interface ContestSearchResult {
  contest : Contest,
  warning : boolean
}
