export const tagOptions = [
  { value: "adventure", label: "Adventure and RPG" },
  { value: "combat", label: "Combat / PVP" },
  { value: "expert", label: "Expert" },
  { value: "exploration", label: "Exploration" },
  { value: "ftb_official", label: "FTB Official Pack" },
  { value: "hardcore", label: "Hardcore" },
  { value: "kitchensink", label: "Kitchen Sink" },
  { value: "magic", label: "Magic / Fantasy" },
  { value: "medieval", label: "Medieval" },
  { value: "minigame", label: "Mini Game" },
  { value: "pixelmon", label: "Pixelmon / Cobblemon" },
  { value: "quests", label: "Quests" },
  { value: "roleplaying", label: "Roleplaying" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "skyblock", label: "Skyblock" },
  { value: "small", label: "Small / Light" },
  { value: "story", label: "Story Driven" },
  { value: "tech", label: "Tech" },
  { value: "vanilla+", label: "Vanilla+" },
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

export const tagMap = new Map(
  tagOptions.map((option) => [option.value, option.label])
);
