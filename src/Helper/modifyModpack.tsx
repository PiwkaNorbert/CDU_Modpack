export const tagOptions = [
  { value: "adventure", label: "Adventure and RPG" },
  { value: "roleplaying", label: "Roleplaying" },
  { value: "combat", label: "Combat / PVP" },
  { value: "exploration", label: "Exploration" },
  { value: "xl", label: "Extra Large" },
  { value: "ftb_official", label: "FTB Official Pack" },
  { value: "hardcore", label: "Hardcore" },
  { value: "magic", label: "Magic" },
  { value: "minigame", label: "Mini Game" },
  { value: "multiplayer", label: "Multiplayer" },
  { value: "quests", label: "Quests" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "skyblock", label: "Skyblock" },
  { value: "small", label: "Small / Light" },
  { value: "tech", label: "Tech" },
  { value: "vanilla+", label: "Vanilla+" },
  { value: "expert", label: "Expert" },
  { value: "story", label: "Story Driven" },
];

export const colorOptions = [
  { value: "sky", label: "Sky" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "teal", label: "Teal" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "fuchsia", label: "Fuchsia" },
];

export const tagMap = new Map(tagOptions.map(option => [option.value, option.label]));

