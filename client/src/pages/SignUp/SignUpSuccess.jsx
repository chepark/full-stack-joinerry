import React, { useEffect } from "react";

const SignUpSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 500);
  }, []);
  return <div>SignUpSuccess</div>;
};

export default SignUpSuccess;
