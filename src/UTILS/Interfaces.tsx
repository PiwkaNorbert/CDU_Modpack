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
  discordId: string;
  image: string;
}
export interface ICommentComponent {
  key: number;
  borderColor: string;
  comment: IComment;
}
export interface DiscordProfileData {
  isLoggedIn: boolean | null;
  avatar: string | null;
  globalName: string | null;
  id: string | null;
  username: string | null;
  isAdmin: boolean | null;
  votesRemaining: number | null;

} 
export interface VoteForPackButtonProps {
  modpackId: string;
  borderColor: string;
  timesVoted: number;
  userProfile: DiscordProfileData;
  isLoading: boolean

  // Replace 'UserProfileType' with the actual type for the 'userProfile' prop
}