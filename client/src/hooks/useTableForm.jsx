import { useState } from "react";

const useTableForm = (validateOnChange = false) => {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    role: "",
    number: "",
    isOpened: "",
  });

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
      setRoles(() => {
        return [...roles, values];
      });
    }
  };

  const handleEdit = (roleToEdit) => {
    const { role, number, isOpened } = roleToEdit;
    // put the value to the last row.
    setValues({ role: role, number: number, isOpened: isOpened });

    if (roles.length > 1) {
      const otherRoles = roles.filter((role) => {
        return role.role !== roleToEdit.role;
      });

      setRoles(otherRoles);
    } else setRoles([]);
  };

  const handleRemove = (roleToRemove) => {
    if (roles.length > 1) {
      const otherRoles = roles.filter((role) => {
        return role.role !== roleToRemove.role;
      });

      setRoles(otherRoles);
    } else setRoles([]);
  };

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
    roles,
    setRoles,
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleAdd,
    handleEdit,
    handleRemove,
  };
};

export default useTableForm;
