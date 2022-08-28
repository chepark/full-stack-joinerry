import { useState, useEffect } from "react";
import defaultProfileImage from "../assets/profile.png";

const useProfileImageSrc = (profileImageId = "") => {
  const [profileImageSrc, setProfileImageSrc] = useState();

  useEffect(() => {
    if (profileImageId === "") return setProfileImageSrc(defaultProfileImage);

    if (profileImageId.includes("https" || "http"))
      return setProfileImageSrc(profileImageId);

    return setProfileImageSrc(
      process.env.REACT_APP_SERVER_BASE_URL +
        "/api/users/current_user/profileImage/" +
        profileImageId
    );
  }, [profileImageId]);

  return { profileImageSrc };
};

export default useProfileImageSrc;
