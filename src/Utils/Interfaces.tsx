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
  voteCount: number;
  suggestedBy: string;
}
export interface IComment {
  username: string | undefined;
  comment: string | undefined;
  timestamp: number;
  discord_id: string | undefined;
  avatar_url: string | undefined;
  uuid: string;
}
export interface ICommentComponent {
  borderColor: string;
  discordId : string | undefined;
  comment: IComment;
}
export interface DiscordProfileData {
  isLoggedIn: boolean | undefined;
  avatar: string | undefined;
  globalName: string | undefined;
  id: string | undefined;
  username: string | undefined;
  isAdmin: boolean | undefined;
  votesRemaining: number | undefined;
  tokenExpiry: number | undefined;
}
export interface VoteForPackButtonProps {
  modpackId: string;
  borderColor: string;
  voteCount: number;
  isLoading: boolean;

  // Replace 'UserProfileType' with the actual type for the 'userProfile' prop
}
