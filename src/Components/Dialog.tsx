import React, { useEffect, useRef, useState } from "react";

export interface DialogProps {
  allowClose?: boolean;
  contents: React.ReactNode;
  open: boolean;
  dialogStateChange?: (open: boolean) => void;
}

export function Dialog({
  allowClose = true,
  contents,
  open,
  dialogStateChange = () => {},
}: DialogProps) {
  const [showModal, setShowModal] = useState(open);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("MEM LEAK");

    if (open !== showModal) {
      console.log("open changed");

      setShowModal(open);
    }
  }, [open]);

  function updateDialogState(open: boolean) {
    setShowModal(open);
    dialogStateChange(open);
  }

  return showModal ? (
    <>
      <div className="fixed inset-0 z-40 bg-bg/70 "></div>
      <div
        onClick={({ target }) => {
          if (!allowClose || dialog.current?.contains(target as any)) return;
          updateDialogState(false);
        }}
        onKeyDown={({ key }) => {
          if (!allowClose || key !== "Escape") return;

          updateDialogState(false);
        }}
        className="dialog-backdrop "
      >
        <div className="dialog-placement">
          <div className="group relative">
            <div className="dialog-accent-border group-hover:duration-2000 group-hover:opacity-100"></div>
            <div
              ref={dialog}
              className="dialog-content-container bg-white/70  text-bg dark:bg-black/70 dark:text-text"
            >
              {contents}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export interface DropDownProps {
  allowClose?: boolean;
  contents: React.ReactNode;
  open: boolean;
  dropDownStateChange?: (open: boolean) => void;
  position: string;
}

export function DropDown({
  allowClose = true,
  contents,
  open,
  dropDownStateChange = () => {},
  position,
}: DropDownProps) {
  const [showDropDown, setShowDropDown] = useState(open);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("MEM LEAK");

    if (open !== showDropDown) {
      console.log("open changed");

      setShowDropDown(open);
    }
  }, [open]);

  function updateDropDownState(open: boolean) {
    setShowDropDown(open);
    dropDownStateChange(open);
  }

  return showDropDown ? (
    <div
      onClick={({ target }) => {
        if (!allowClose || dropdown.current?.contains(target as any)) return;

        updateDropDownState(false);
      }}
      onKeyDown={({ key }) => {
        if (!allowClose || key !== "Escape") return;

        updateDropDownState(false);
      }}
      className="dialog-backdrop "
    >
      <div
        className={`w-min-content absolute z-[9999] rounded-xl border border-text/20 bg-bg text-text shadow ${position}`}
        ref={dropdown}
      >
        {contents}
      </div>
    </div>
  ) : null;
}
