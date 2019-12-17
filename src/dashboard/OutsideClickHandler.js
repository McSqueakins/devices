import React, { useRef, useEffect } from "react";

const useOutsideClickHandler = (ref, callBack) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callBack();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export const OutsideClickHandler = ({ callBack, children }) => {
  const componentRef = useRef(null);
  useOutsideClickHandler(componentRef, callBack);

  return <div ref={componentRef}>{children}</div>;
};
