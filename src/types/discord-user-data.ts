export type DiscordUserData = {
  player_stats: PlayerStats;
};

export interface PlayerStats {
  uuid: string;
  username: string;
  banned: boolean;
  playtime: string;
  firstjoinedtime: string;
  firstjoinedserverid: number;
  lastjoinedservername: string;
  lastjoinedtime: string;
  uniqueserversseenon: number;
  discordid: string;
  isserverbooster: number;
  mc_blocksbroken: number;
  mc_deaths: number;
  mc_distance: number;
  mc_distanceclimbed: number;
  mc_distancecrouched: number;
  mc_distancefallen: number;
  mc_distanceflown: number;
  mc_distancesprinted: number;
  mc_distanceswum: number;
  mc_distancewalked: number;
  mc_jumps: number;
  mc_mobskilled: number;
  mc_playerskilled: number;
  numberofwarns: number;
  numberofnotes: number;
  votes: number;
  player_awards: any[];
}
// TODO: fix playter_awards type