export interface IModpack {
  modpackId: string;
  name: string;
  imageUrl: string;
  color: string;
  tags: string[];
  voteCount: number;
  commentCount: number;
  timesVoted: number;
}

export interface IPackDetails {
  color: string;
  comments: IComment[];
  description: string;
  galleryImages: IGalleryImage[]; //
  imageUrl: string;
  isSponsored: boolean;
  modpackId: string;
  name: string;
  officialUrl: string;
  suggestedBy: string;
  tags: string[];
  timesVoted: number;
  voteCount: number;
}
export interface IGalleryImage {
  imageUrl: string;
  thumbnailUrl: string;
}

export interface IComment {
  uuid: string;
  discord_id?: number;
  username?: string;
  comment?: string;
  timestamp: number;
  last_updated_time?: number;
  avatar_url?: string;
  profanity_score?: number;
  reply_count: number;
}

export interface ICommentReplies {
  uuid: string;
  discord_id?: number;
  username?: string;
  comment: string;
  timestamp?: number;
  last_updated_time?: number;
  avatar_url?: string;
  profanity_score?: number;
  reply_count: number;
}

export interface ICommentComponent {
  borderColor: string;
  comment?: IComment;
  replyingTo: boolean;
  replyParentId: string;
}
export interface DiscordProfileData {
  isLoggedIn: boolean;
  avatar: string;
  globalName?: string;
  id?: string;
  username?: string;
  isAdmin?: boolean;
  votesRemaining?: number;
  tokenExpiry?: number;
  isLinked?: boolean;
  inGuild?: boolean;
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
  tags: string[];
  color: string;
  suggestor: string;
  officialUrl: string;
}

// image?: File ;

export interface IAddVoteButtonProps {
  votesRemaining?: number;
}
export interface IRemoveVoteButtonProps {
  timesVoted?: number;
}

export interface IAddImageProps {
  images: FileList;
  modpackId?: string;
}
