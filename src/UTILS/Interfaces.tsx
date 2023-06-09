export interface IComments {
  username: string;
  comment: string;
}
export interface IPackDetails {
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  modpackId: string;
  comments: IComments[];
  votes: number;
  hasVoted: boolean;
}
export interface IComments {
  username: string;
  comment: string;
}
export interface DiscordProfileData {
  isLoggedIn: boolean | null;
  avatar: string | null;
  global_name: string | null;
  id: string | null;
  username: string | null;
} 