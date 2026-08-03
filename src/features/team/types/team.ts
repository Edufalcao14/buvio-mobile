import { User } from "@/features/auth/types/user";

export type Team = {
  id: string;
  name: string;
  code: string;
  creator: User;
  sport?: string | null;
};
