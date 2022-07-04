import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>Error</div>;
};

export default Error;
