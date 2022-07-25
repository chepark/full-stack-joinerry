import { useState, useEffect } from "react";
import defaultProfileImage from "../assets/profile.png";

const useProfileImageSrc = (profileImageId = "") => {
  const [profileImageSrc, setProfileImageSrc] = useState();

  useEffect(() => {
    if (profileImageId === "") {
      return setProfileImageSrc(defaultProfileImage);
    }

    setProfileImageSrc(
      "http://localhost:4000/api/users/current_user/profileImage/" +
        profileImageId
    );
  }, [profileImageId]);

  return { profileImageSrc };
};

export default useProfileImageSrc;
