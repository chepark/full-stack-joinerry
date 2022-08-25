import { useState, useEffect } from "react";

const useWindowSize = () => {
  const HEADER_FOOTER_HEIGHTS = 227;
  const [size, setSize] = useState([
    window.innerHeight - HEADER_FOOTER_HEIGHTS,
    window.innerWidth,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight - HEADER_FOOTER_HEIGHTS, window.innerWidth]);
    };

    // window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
