export interface IModpack {
  modpackId: string;
  name: string;
  imageUrl: string;
  color: string;
  voteCount: number;
  commentCount: number;
  timesVoted: number;
}

export interface IPackDetails {
  color: string;
  comments: IComment[];
  description: string;
  imageUrl: string;
  modpackId: string;
  name: string;
  officialUrl: string;
  suggestedBy: string;
  timesVoted: number;
  voteCount: number;
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
  discordId: string | undefined;
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
  timesVoted: number;
  isLoading: boolean;

  // Replace 'UserProfileType' with the actual type for the 'userProfile' prop
}

export interface AddModpackProps {
  name: string;
  description: string;
  image: File | undefined;
  color: string;
  suggestor: string;
  officialUrl: string;
}
