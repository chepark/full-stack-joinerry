import "./_accountSetting.scss";
import React from "react";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatMuiErrorMessage } from "@mui/utils";

// set the default value of react-hook-form
// https://react-hook-form.com/kr/v6/api/#reset

const AccountSetting = () => {
  const schema = yup.object().shape({
    username: yup.string(),
    profileImage: yup.mixed(),
    bio: yup.string().min(10),
    twitter: yup.string().url(),
    github: yup.string().url(),
    linkedin: yup.string().url(),
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="User Name"
              required
              error={errors.username}
              helperText={errors.email ? errors.email?.message : ""}
            />
          )}
        />
        <TextField
          label="Email"
          defaultValue="abc@gmail.com"
          InputProps={{
            readOnly: true,
          }}
        />
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
              error={errors.bio}
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
              variant="outlined"
              label="Twitter"
              error={errors.twitter}
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
              variant="outlined"
              label="Github"
              error={errors.github}
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
              variant="outlined"
              label="LinkedIn"
              error={errors.linkedin}
              helperText={errors.linkedin ? errors.linkedin?.message : ""}
            />
          )}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSetting;
