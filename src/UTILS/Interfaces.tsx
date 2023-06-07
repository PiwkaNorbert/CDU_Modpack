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
}
export interface IComments {
  username: string;
  comment: string;
}
