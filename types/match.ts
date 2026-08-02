import { Team } from "./team";
import { User } from "./user";

export type Match = {
  id: string;
  name: string;
  date: Date;
  creatorId: string;
  team: Team;
  players: User[];
};

export enum MatchType {
  AMICAL = "AMICAL",
  TOURNOI = "TOURNOI",
  CHAMPIONNAT = "CHAMPIONNAT",
}
