export interface IModpack {
  modpackId: number;
  name: string;
  imageUrl: string;
  color: string;
  voteCount: number;
}
export interface IPackDetails {
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  modpackId: string;
  comments: IComment[];
  votes: number;
  hasVoted: boolean;
}
export interface IComment {
  username: string;
  comment: string;
  timestamp: number;
  discordId: string;
  image: string;
}
export interface ICommentComponent {
  index: number;
  borderColor: string;
  comment: IComment;
}
export interface DiscordProfileData {
  isLoggedIn: boolean | null;
  avatar: string | null;
  global_name: string | null;
  id: string | null;
  username: string | null;
} 
export interface VoteForPackButtonProps {
  modpackId: string;
  borderColor: string;
  hasVoted: boolean;
  userProfile: DiscordProfileData;
  isLoading: boolean
  // Replace 'UserProfileType' with the actual type for the 'userProfile' prop
}