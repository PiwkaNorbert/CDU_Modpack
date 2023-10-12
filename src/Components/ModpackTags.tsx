import { useMemo } from "react";
import { IModpack, TagCount } from "../Utils/Interfaces";
import { twMerge } from "tailwind-merge";
import { tagMap } from "../Helper/modifyModpack";

export function ModpackTags({
  modpacks,
  onTagClick,
  modPackFilterByTags,
}: {
  modpacks?: IModpack[];
  onTagClick: (tag: string) => void;
  modPackFilterByTags: string[];
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

    // Sort the tag counts array based on the specified order
    newTagCounts.sort((a, b) => {
      // check if the tag is active or not
      const aIsActive = modPackFilterByTags.includes(a.name);
      const bIsActive = modPackFilterByTags.includes(b.name);

      // check if the tag is disabled or not
      const aIsDisabled = a.count === 0;
      const bIsDisabled = b.count === 0;

      // if the tags are not the same, sort them based on their active status
      if (aIsActive !== bIsActive) {
        return aIsActive ? -1 : 1;
      }
      // if the tags are not the same, sort them based on their disabled status
      if (aIsDisabled !== bIsDisabled) {
        return aIsDisabled ? 1 : -1;
      }
      // if both tags are active or disabled, sort them alphabetically
      return a.name.localeCompare(b.name);
    });

    return newTagCounts;
  }, [modpacks, modPackFilterByTags]);

  // Map over the tag counts array to render tag buttons
  return (
    <div className="flex flex-wrap gap-2">
      {tagCounts.map((tagCount: TagCount) => {
        const isActive = modPackFilterByTags.includes(tagCount.name);
        const isDisabled = tagCount.count === 0;
        const tagClasses = twMerge(
          "z-[5] flex gap-1 items-center justify-center capitalize rounded-full px-3 py-1 text-sm transition-all hover:bg-opacity-80 dark:hover:bg-opacity-80 dark:disabled:hover:bg-opacity-100 disabled:opacity-50 ",
          isActive
            ? `bg-slate-700 text-bg dark:bg-slate-300 dark:text-bg `
            : `bg-slate-300 text-text dark:bg-slate-700 dark:text-text`
        );

        return (
          <button
            key={tagCount.name}
            className={tagClasses}
            onClick={() => onTagClick(tagCount.name)}
            disabled={isDisabled}
          >
            {tagMap.get(tagCount.name) ?? tagCount.name}
            <span
              className={twMerge(
                `text-text/50`,
                modPackFilterByTags.includes(tagCount.name) &&
                  `text-bg/50 dark:text-bg/50`
              )}
            >
              ({tagCount.count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
