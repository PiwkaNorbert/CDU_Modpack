export interface IModpack {
  modpackId: string;
  name: string;
  imageUrl: string;
  color: string;
  voteCount: number;
  commentCount: number;
}
export interface IPackDetails {
  color: string;
  comments: IComment[];
  description: string;
  imageUrl: string;
  modpackId: string;
  name: string;
  timesVoted: number;
  voteCount: number;
}
export interface IComment {
  username: string;
  comment: string;
  timestamp: number;
  discord_id: string;
  avatar_url: string;
}
export interface ICommentComponent {
  key: number;
  borderColor: string;
  comment: IComment;
}
export interface DiscordProfileData {
  isLoggedIn: boolean;
  avatar: string;
  globalName: string;
  id: string;
  username: string;
  isAdmin: boolean;
  votesRemaining: number;
  tokenExpiry: number;
} 
export interface VoteForPackButtonProps {
  modpackId: string;
  borderColor: string;
  timesVoted: number;
  userProfile: DiscordProfileData;
  isLoading: boolean

  // Replace 'UserProfileType' with the actual type for the 'userProfile' prop
}