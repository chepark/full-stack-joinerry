import React, { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <div>Success</div>;
};

export default Success;
