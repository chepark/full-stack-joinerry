import "./_accountSetting.scss";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  twitterUrlRegEx,
  githubUrlRegEx,
  linkedInUrlRegEx,
} from "../../utils/validationRegEx";

import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import defaultProfileImage from "../../assets/profile.png";
import useUserContext from "../../hooks/useUserContext";

const AccountSetting = () => {
  const imageFileFormats = ["image/jpeg", "image/png", "image/gif"];
  const [profileImageUrl, setProfileImageUrl] = useState();
  const { user } = useUserContext();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(2, "Must be at least 2 characters.")
      .max(20, "Must be less than 20 characters.")
      .required(),
    profileImage: yup
      .mixed()
      .test(
        "fileFormat",
        "File type should be jpg, jpeg, or png.",
        (value) =>
          value === (null || "") || imageFileFormats.includes(value[0]?.type)
      ),
    bio: yup.string().matches(/^(|.{10,100})$/, "Between 10-100 characters"),
    twitter: yup.string().matches(twitterUrlRegEx, {
      message: "ex) https://twitter.com/<YourTwitterAccount>",
      excludeEmptyString: true,
    }),
    github: yup.string().matches(githubUrlRegEx, {
      message: "ex) https://github.com/<YourGithubAccount>",
      excludeEmptyString: true,
    }),
    linkedin: yup.string().matches(linkedInUrlRegEx, {
      message: "ex) https://www.linkedin.com/in/yourLinkedInProfile",
      excludeEmptyString: true,
    }),
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profileImage: user.profileImage ? user.profileImage : "",
      username: user.userName ? user.userName : "",
      bio: user?.bio ? user.bio : "",
      twitter: user?.social?.twitter ? user.social.twitter : "",
      github: user?.social?.github ? user.social.github : "",
      linkedin: user?.social?.linkedin ? user.social.linkedin : "",
    },
    resolver: yupResolver(schema),
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
    const response = await fetch(
      "http://localhost:4000/api/users/current_user/update",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const json = await response.json();
    console.log("json", json);
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
    if (user.profileImage)
      setProfileImageUrl(
        "http://localhost:4000/api/users/current_user/profileImage/" +
          user.profileImage
      );
    else setProfileImageUrl(defaultProfileImage);
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
                <img src={profileImageUrl} alt="profile" />
              </div>

              <Controller
                name="profileImage"
                control={control}
                type="file"
                render={({ field }) => (
                  <TextField
                    // {...field}
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
