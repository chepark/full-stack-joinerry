import React, { useState } from "react";
import { useEffect } from "react";

const useTableForm = (validateOnChange = false) => {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    role: "",
    number: "",
    isOpened: "",
  });
  const [onReset, setOnReset] = useState(false);

  const handleInputChange = (name, inputValue) => {
    setValues((values) => {
      return {
        ...values,
        [name]: inputValue,
      };
    });

    if (validateOnChange) {
      validate({ [name]: inputValue });
    }
  };

  const handleAdd = () => {
    if (validate()) {
      //   console.log(true);
      setRoles(() => {
        return [...roles, values];
      });
    }

    // resetTableForm();
    // console.log(false);
  };

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };

    if ("role" in fieldValues)
      tempErrors.role = fieldValues.role === "" ? "Required field." : "";

    if ("number" in fieldValues)
      tempErrors.number =
        fieldValues.number === "0" || fieldValues.number === ""
          ? "Should be greater than 0"
          : "";

    if ("isOpened" in fieldValues)
      tempErrors.isOpened =
        fieldValues.isOpened === "" ? "Required field." : "";

    setErrors({ ...tempErrors });
    console.log("fieldValues !==values");
    console.log("FieldValues:", fieldValues);
    console.log("VALUES: ", values);
    if (fieldValues === values) {
      console.log("fieldvalue === values");
      console.log("FieldValues:", fieldValues);
      console.log("VALUES: ", values);
      return Object.values(tempErrors).every((x) => x === "");
    }
  };

  const resetTableForm = () => {
    setValues(() => {
      return { role: "", number: "", isOpened: "" };
    });

    setErrors(() => {
      return {};
    });
  };

  return {
    roles,
    setRoles,
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleAdd,
    onReset,
  };
};

export default useTableForm;
