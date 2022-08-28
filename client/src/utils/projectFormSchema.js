import * as yup from "yup";

import categoriesJson from "../data/categories.json";
import rolesJson from "../data/roles.json";

const categoryOptions = categoriesJson.categories;
const roleOptions = rolesJson.roles;

const validateRole = (value) => {
  if (roleOptions.includes(value)) return true;
  else return false;
};

const validateRoleOpened = (value) => {
  const roleStatus = ["opened", "filled"];
  if (roleStatus.includes(value)) return true;
  else return false;
};

const validateCategory = (value) => {
  if (categoryOptions.includes(value)) return true;
  else return false;
};

const validateNumberRange = (value) => {
  if (value < 1 || value > 99) {
    return false;
  } else return true;
};

const roleSchema = yup.object({
  role: yup.mixed().test("check role", "Select one option.", validateRole),
  number: yup
    .number()
    .typeError("Must be a number.")
    .test("numberRange", "Must be between 1 to 99.", validateNumberRange),

  isOpened: yup
    .mixed()
    .test("check role opened", "Select one option.", validateRoleOpened),
});

const projectValidationSchema = {
  category: yup
    .mixed()
    .test("check null", "Must select one option.", validateCategory),
  techStack: yup
    .array()
    .of(yup.string())
    .min(1, "At least 1 tag.")
    .max(5, "Max 5 tags")
    .required("Required."),
  roles: yup.array().of(roleSchema),
  startDate: yup.date().nullable(),
  endDate: yup
    .date()
    .when("startDate", (startDate, schema) => {
      if (startDate) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
        return schema.min(dayAfter, "Must be after start date.");
      }
      return schema;
    })
    .nullable(),
  contact: yup
    .string()
    .min(3, "Must be more than 3 characters.")
    .max(30, "Must be less than 30 characters.")
    .required("Required."),
  title: yup
    .string()
    .min(3, "Must be more than 3 characters.")
    .max(30, "Must be less than 30 characters.")
    .required("Required."),

  content: yup
    .string()
    .min(10, "Must be more than 10 characters.")
    .max(120, "Must be less than 120 characters.")
    .required("Required."),
};

export const projectSchema = yup.object().shape(projectValidationSchema);
