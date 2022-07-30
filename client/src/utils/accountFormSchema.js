import * as yup from "yup";
import {
  twitterUrlRegEx,
  githubUrlRegEx,
  linkedInUrlRegEx,
} from "./validationRegEx";

const imageFileFormats = ["image/jpeg", "image/png", "image/gif"];

export const accountSchema = yup.object().shape({
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
