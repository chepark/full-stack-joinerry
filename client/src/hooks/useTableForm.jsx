import { useState } from "react";

const useTableForm = (roles) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    role: "",
    number: "",
    isOpened: "",
  });

  const findDuplicates = (fieldValues) => {
    return roles.find((role) => {
      return role.role === fieldValues.role;
    });
  };

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };

    if ("role" in fieldValues) {
      tempErrors.role = fieldValues.role === "" ? "Required field." : "";
      tempErrors.role = findDuplicates(fieldValues)
        ? "Role already exists."
        : "";
    }

    if ("number" in fieldValues)
      tempErrors.number =
        fieldValues.number === "0" || fieldValues.number === ""
          ? "Should be greater than 0"
          : "";

    if ("isOpened" in fieldValues)
      tempErrors.isOpened =
        fieldValues.isOpened === "" ? "Required field." : "";

    setErrors({ ...tempErrors });

    if (fieldValues === values) {
      return Object.values(tempErrors).every((x) => x === "");
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    validate,
  };
};

export default useTableForm;
