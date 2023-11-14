export default function Loading({ size, fullScreen, other }: LoadingProps) {
  return (
    <div
      className={`${
        fullScreen
          ? "flex h-screen flex-col items-center justify-center gap-4 text-gray-800 dark:text-gray-200"
          : ""
      } ${other}`}
    >
      <div
        className={`la-ball-clip-rotate mx-auto ${size} la-dark
        ${
          !window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "la-dark"
            : ""
        }`}
      >
        <div></div>
      </div>
      {fullScreen && <span className="loader">Loading</span>}
    </div>
  );
}
export interface LoadingProps {
  size?: string;
  fullScreen?: boolean;
  other?: string;
}
