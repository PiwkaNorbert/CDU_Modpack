import { useMemo } from "react";
import { IModpack, TagCount } from "../Utils/Interfaces";
import { twMerge } from "tailwind-merge";
import { tagMap } from "../Helper/modifyModpack";

export function ModpackTags({ modpacks, onTagClick, modPackFilterByTags }: {
  modpacks?: IModpack[];
  onTagClick: (tag: string) => void;
  modPackFilterByTags: string;
}) {
  // Initialize a state variable to store tag counts
  const tagCounts = useMemo(() => {
    // Calculate tag counts when modpacks change
    const newTagCounts: TagCount[] = [];

    modpacks?.forEach((modpack: IModpack) => {
      modpack.tags.forEach((tag) => {
        const tagIndex = newTagCounts.findIndex((t) => t.name === tag);
        if (tagIndex !== -1) {
          newTagCounts[tagIndex].count += 1; // Increment tag count if it exists
        } else {
          newTagCounts.push({ name: tag, count: 1 }); // Initialize tag count to 1 if it doesn't exist
        }
      });
    });

    // display the rest of the tags if their count is 0
    tagMap.forEach((_, key) => {

      const tagIndex = newTagCounts.findIndex((t) => t.name === key);
      if (tagIndex === -1) {
        newTagCounts.push({ name: key, count: 0 }); // Initialize tag count to 0 if it doesn't exist
      }
    });

    return newTagCounts;
  }, [modpacks]);

  return tagCounts.map(({ name, count }, index: number) => <button
    key={index}
    type="button"
    disabled={count === 0}
    className={twMerge(
      "z-[5] flex gap-1 items-center justify-center capitalize rounded-full px-3 py-1 text-sm transition-all hover:bg-opacity-80 dark:hover:bg-opacity-80 dark:disabled:hover:bg-opacity-100 disabled:opacity-50 ",
      modPackFilterByTags.includes(name)
        ? `bg-slate-700 text-bg dark:bg-slate-300 dark:text-bg `
        : `bg-slate-300 text-text dark:bg-slate-700 dark:text-text`
    )}
    onClick={() => onTagClick(name)}
  >
    {tagMap.get(name)}
    <span
      className={twMerge(
        `text-text/50`,
        modPackFilterByTags.includes(name) &&
        `text-bg/50 dark:text-bg/50`
      )}
    >
      ({count})
    </span>
  </button>


  );
}
