import React from "react";

const OpeningStatus = (props) => {
  const { status } = props;

  return (
    <div
      className={`detail-role__status ${
        status === "opened" || true ? "status-opened" : "status-filled"
      }`}
    >
      {status}
    </div>
  );
};

export default OpeningStatus;
