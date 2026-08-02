import { User } from "./user";

export type Team = {
  id: string;
  name: string;
  code: string;
  creator: User;
  sport?: string | null;
};
