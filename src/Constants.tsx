export const isDev = import.meta.env.VITE_NODE_ENV === "development";
export const isProd = import.meta.env.VITE_NODE_ENV === "production";
export const apiBase = isDev
  ? "https://modpacks.playcdu.co"
  : isProd
  ? "https://modpacks.playcdu.co"
  : "https://modpacks.playcdu.co";

export const RETURN_TO_HOME_PAGE_TIMER = 19; // in seconds

export const colorOptions = [
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "teal", label: "Teal" },
  { value: "sky", label: "Sky" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "fuchsia", label: "Fuchsia" },
];

export const bgColorVariants: Record<string, string> = {
  red: "bg-red-400",
  orange: "bg-orange-400",
  yellow: "bg-yellow-400",
  lime: "bg-lime-400",
  teal: "bg-teal-400",
  green: "bg-green-400",
  blue: "bg-blue-400",
  violet: "bg-violet-400",
  fuchsia: "bg-fuchsia-400",
  sky: "bg-sky-400",
};
export const borderColorVariants: Record<string, string> = {
  red: "border-red-400",
  orange: "border-orange-400",
  yellow: "border-yellow-400",
  lime: "border-lime-400",
  teal: "border-teal-400",
  green: "border-green-400",
  blue: "border-blue-400",
  violet: "border-violet-400",
  fuchsia: "border-fuchsia-400",
  sky: "border-sky-400",
};
export const textColorVariants: Record<string, string> = {
  red: "text-red-400",
  orange: "text-orange-400",
  yellow: "text-yellow-400",
  lime: "text-lime-400",
  teal: "text-teal-400",
  green: "text-green-400",
  blue: "text-blue-400",
  violet: "text-violet-400",
  fuchsia: "text-fuchsia-400",
  sky: "text-sky-400",
};

export const staticLabels = [
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: "placeholder",
    name: "Modpack",
    imageUrl: "/src/assets/placeholderImg.png",
    color: "white",
    voteCount: 0,
    commentCount: 0,
  },
];

export const placeholderDetails = {
  color: "grey",
  name: "Modpackss",
  comments: [
    {
      username: "Placeholder",
      comment: "This is a placeholder comment",
      timestamp: 0,
      discord_id: "0",
      avatar_url: "a",
    },
  ],
  description: "This is a placeholder description",
  galleryImages: [
    {
      imageUrl: "/placeholderImg.png",
    },
  ],
  imageUrl: "/placeholderImg.png",
  isSponsored: false,
  modpackId: "placeholder",
  officialUrl: "https://www.trainjumper.com",
  suggestedBy: "Placeholder",
  tags: ["placeholder", "placeholder"],
  timesVoted: 0,
  voteCount: 0,
  isArchived: false,
  isPublished: true,
};

export const packLocation = [
  {
    name: "Modpacks",
    pathname: "/",
    childPathname: "/pack-details",
    svgPath:
      "M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.35,44L178.57,92.29l-80.35-44Zm0,88L47.65,76,81.56,57.43l80.35,44Zm88,55.85h0l-80,43.79V133.83l32-17.51V152a8,8,0,0,0,16,0V107.56l32-17.51v85.76Z",
  },
  {
    name: "Archived Packs",
    pathname: "/list-archived-packs",
    childPathname: "/archived-pack-details",
    svgPath:
      "M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-72,96H104a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm72-56H32V64H224V88Z",
  },
  {
    name: "Suggested Packs",
    pathname: "/list-suggested-packs",
    childPathname: "/suggested-pack-details",
    svgPath:
      "M32,72V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V72a8,8,0,0,1-8,8H40A8,8,0,0,1,32,72Zm8,72H216a8,8,0,0,0,8-8V120a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8v16A8,8,0,0,0,40,144Zm112,32H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H152a8,8,0,0,0,8-8V184A8,8,0,0,0,152,176Zm80,8H216V168a8,8,0,0,0-16,0v16H184a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V200h16a8,8,0,0,0,0-16Z",
  },
];

export const links = [
  {
    name: "Found Issue?",
    href: "/found-issue",
    target: "_self",
  },
  {
    name: "Forum",
    href: "https://forum.playcdu.co",
    target: "_blank",
  },
  {
    name: "Contact us",
    href: "https://forum.playcdu.co/misc/contact",
    target: "_blank",
    "data-xf-click": "overlay",
  },
  {
    name: "Terms and rules",
    href: "https://forum.playcdu.co/help/terms/",
    target: "_blank",
  },
  {
    name: "Privacy policy",
    href: "https://forum.playcdu.co/help/privacy-policy/",
    target: "_blank",
  },
  {
    name: "Help",
    href: "https://forum.playcdu.co/help/",
    target: "_blank",
  },
];
