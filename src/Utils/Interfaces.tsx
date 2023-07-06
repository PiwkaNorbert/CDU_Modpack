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
  uuid: string;
  discord_id?: number ;
  username?: string ;
  comment?: string ;
  timestamp: number;
  last_updated_time?: number;
  avatar_url?: string ;
  profanity_score?: number;
  reply_count?: number;
}

export interface ICommentReplies {
  uuid?: string;
  discord_id?: number ;
  username?: string ;
  comment?: string ;
  timestamp?: number;
  last_updated_time?: number;
  avatar_url?: string ;
  profanity_score?: number;
  reply_count: number;

}

export interface ICommentComponent {
  borderColor: string;
  comment: IComment;
  replyingTo: boolean
  replyParentId: string;
}
export interface DiscordProfileData {
  isLoggedIn?: boolean ;
  avatar?: string ;
  globalName?: string ;
  id?: string ;
  username?: string;
  isAdmin?: boolean;
  votesRemaining?: number;
  tokenExpiry?: number;
  isLinked?: boolean;
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
