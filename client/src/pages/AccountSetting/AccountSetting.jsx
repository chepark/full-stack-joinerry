import "./_accountSetting.scss";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useUserContext from "../../hooks/useUserContext";
import useProfileImageSrc from "../../hooks/useProfileImageSrc";

import { accountSchema } from "../../utils";
import { updateUser } from "../../apis";
import { UPDATE_USER } from "../../constants/actionTypes";

const AccountSetting = () => {
  const { user, dispatch } = useUserContext();
  const [profileImageUrl, setProfileImageUrl] = useState();
  const { profileImageSrc } = useProfileImageSrc(user.profileImage);

  const defaultValues = {
    profileImage: user.profileImage ? user.profileImage : "",
    username: user.userName ? user.userName : "",
    bio: user?.bio ? user.bio : "",
    twitter: user?.social?.twitter ? user.social.twitter : "",
    github: user?.social?.github ? user.social.github : "",
    linkedin: user?.social?.linkedin ? user.social.linkedin : "",
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = async (data) => {
    const { profileImage, bio, twitter, github, linkedin, username } = data;

    if (
      (username === user.userName || username === "") &&
      !profileImage &&
      !bio &&
      !twitter &&
      !github &&
      !linkedin
    )
      return;

    const formData = setFormData(data);

    updateUser(formData, (updatedValues) => {
      dispatch({ type: UPDATE_USER, payload: updatedValues });
    });
  };

  const setFormData = (data) => {
    const { profileImage, bio, twitter, github, linkedin, username } = data;
    const formData = new FormData();
    profileImage &&
      formData.append("profileImage", profileImage[0], profileImage[0].name);
    username && formData.append("userName", username);
    bio && formData.append("bio", bio);
    twitter && formData.append("twitter", twitter);
    linkedin && formData.append("linkedin", linkedin);
    github && formData.append("github", github);

    return formData;
  };

  const onError = (data) => {
    console.log("error", data);
  };

  useEffect(() => {
    setProfileImageUrl(profileImageSrc);
    reset({
      profileImage: "",
      username: user.userName ? user.userName : "",
      email: user.email,
      bio: user.bio ? user.bio : "",
      twitter: user?.social?.twitter ? user?.social?.twitter : "",
      github: user?.social?.github ? user?.social?.github : "",
      linkedin: user?.social?.linkedin ? user?.social?.linkedin : "",
    });
  }, [user]);

  console.log(watch());

  return (
    <div className="account-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="account-form">
        {user.email && (
          <>
            <div className="form-sectioon form-image">
              <div className="profile-image-wrapper">
                {profileImageUrl && <img src={profileImageUrl} alt="profile" />}
              </div>

              <Controller
                name="profileImage"
                control={control}
                type="file"
                render={({ field }) => (
                  <TextField
                    hidden
                    type="file"
                    onChange={(e) => {
                      setProfileImageUrl(
                        URL.createObjectURL(e.target.files[0])
                      );
                      field.onChange(e.target.files);
                    }}
                  />
                )}
              />
            </div>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Name"
                  variant="outlined"
                  required
                  error={errors?.username}
                  helperText={errors.username ? errors.username?.message : ""}
                />
              )}
            />

            <div className="form-input-wrapper form-email">
              <div>Email: </div>
              <div>{user.email}</div>
            </div>

            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Bio"
                  multiline
                  rows={4}
                  error={errors?.bio}
                  helperText={errors.bio ? errors.bio?.message : ""}
                />
              )}
            />

            <Controller
              name="twitter"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    "& .MuiFormLabel-root": {
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    },
                  }}
                  variant="outlined"
                  label={
                    <>
                      <TwitterIcon />
                      Twitter
                    </>
                  }
                  error={errors?.twitter}
                  helperText={errors.twitter ? errors.twitter?.message : ""}
                />
              )}
            />
            <Controller
              name="github"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    "& .MuiFormLabel-root": {
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    },
                  }}
                  variant="outlined"
                  label={
                    <>
                      <GitHubIcon />
                      Github
                    </>
                  }
                  error={errors?.github}
                  helperText={errors.github ? errors.github?.message : ""}
                />
              )}
            />
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    "& .MuiFormLabel-root": {
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    },
                  }}
                  variant="outlined"
                  label={
                    <>
                      <LinkedInIcon />
                      LinkedIn
                    </>
                  }
                  error={errors?.linkedin}
                  helperText={errors.linkedin ? errors.linkedin?.message : ""}
                />
              )}
            />
          </>
        )}
        <button className="form-submit" type="submit">
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};

export default AccountSetting;
