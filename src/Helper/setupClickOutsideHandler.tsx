export const setupClickOutsideHandler = (
  menuRef: React.MutableRefObject<any>,
  buttonRef: React.MutableRefObject<any>,
  setShown: (value: boolean) => void
) => {
  const handleClickOutside = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
};
