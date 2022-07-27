import * as yup from "yup";

import categoriesJson from "../data/categories.json";
// import rolesJson from "../../data/roles.json";
// import tagsJson from "../../data/techstacks.json";

const categoryOptions = categoriesJson.categories;

const roleSchema = yup.object({
  role: yup.string(),
  number: yup
    .number()
    .min(1, "Must be greater than 0.")
    .max(99, "Must be less than 99."),
  isOpened: yup.string(),
});

export const projectFormSchema = {
  category: yup
    .string()
    .oneOf(categoryOptions, "Select one from the given options.")
    .required("Required"),
  techStack: yup
    .array()
    .of(yup.string())
    .min(1, "At least 1 tag.")
    .max(5, "Max 5 tags")
    .required("Required"),
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
  contact: yup.string().required("Required"),
  title: yup
    .string()
    .min(3, "Must be more than 3 characters.")
    .max(30, "Must be less than 30 characters.")
    .required("Required"),

  content: yup
    .string()
    .min(10, "Must be more than 10 characters")
    .max(120, "Must be less than 120 characters")
    .required("Required."),
};
