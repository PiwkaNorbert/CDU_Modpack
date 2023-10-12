import { IModpack } from "../Utils/Interfaces";

export const filterModpacks = (
  modpacks: IModpack[],
  modPackFilterByInput: string[],
  modPackFilterByTags: string[]
): IModpack[] => {
  if (!(modPackFilterByInput || modPackFilterByTags)) return modpacks;

  let filteredModpacks = modpacks;
  // sort packs by input value
  if (modPackFilterByInput.length > 0) {
    filteredModpacks = filteredModpacks.filter(
      (modpack) =>
        modpack.name
          .toLowerCase()
          .includes(modPackFilterByInput[0].toLowerCase()) ||
        modpack.tags.some(
          (tag) => tag.toLowerCase() === modPackFilterByInput[0].toLowerCase()
        )
    );
  }

  // sort packs by tags
  if (modPackFilterByTags.length > 0) {
    filteredModpacks = filteredModpacks.filter(
      (modpack: IModpack) =>
        modPackFilterByTags.filter((tag) => modpack.tags.includes(tag))
          .length === modPackFilterByTags.length
    );
  }

  return filteredModpacks;
};
