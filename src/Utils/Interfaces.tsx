import { AxiosError } from "axios";

export interface IModpack {
  color: string;
  commentCount: number;
  imageUrl: string;
  isSponsored: boolean;
  modpackId: string;
  name: string;
  tags: string[];
  timesVoted: number;
  voteCount: number;
  isPublished: boolean;
  isArchived: boolean;
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
  publishedBy: string;
  tags: string[];
  timesVoted: number;
  voteCount: number;
  isArchived: boolean;
  isPublished: boolean;
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
  color: string;
  comment?: IComment;
  replyingTo: boolean;
  replyParentId: string;
}
export interface ICommentComponentChildren extends ICommentComponent {
  children?: React.ReactNode;
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
  playerData?: IMCPlayerData;
}
export interface IMCPlayerData {
  uuid: string;
  username: string;
  discord_id: string;
  mc_avatar_url: string;
  mc_head_url: string;
  mc_avatar_url_fallback: string;
}
export interface VoteForPackButtonProps {
  modpackId: string;
  color: string;
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
  officialUrl: string;
}

// image?: File ;

export interface IAddVoteButtonProps {
  votesRemaining?: number;
}
export interface IRemoveVoteButtonProps {
  timesVoted: number;
}

export interface IAddImageProps {
  images: FileList;
  modpackId?: string;
}

export interface iPackData {
  data: IModpack[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown> | null;
  modPackFilterByTags: string[];
  modPackFilterByInput: string[];
  setModPackFilterByInput: React.Dispatch<React.SetStateAction<string[]>>;
  setModPackFilterByTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface TagCount {
  name: string;
  count: number;
}
