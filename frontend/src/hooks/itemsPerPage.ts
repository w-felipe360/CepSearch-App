import { useState, useEffect } from "react";

export function useResponsiveItemsPerPage(mobileCount: number, desktopCount: number) {
  const [itemsPerPage, setItemsPerPage] = useState(desktopCount);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setItemsPerPage(mediaQuery.matches ? mobileCount : desktopCount);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [mobileCount, desktopCount]);

  return itemsPerPage;
}
