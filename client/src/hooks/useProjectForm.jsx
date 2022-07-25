import { useState } from "react";

const useProjectForm = () => {
  const [values, setValues] = useState({
    category: null,
    techStack: [],
    roles: [],
    startDate: null,
    endDate: null,
    contact: "",
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, inputValue) => {
    setValues({ ...values, [name]: inputValue });

    validate({ [name]: inputValue });
  };

  const compareDates = (tempErrors, option) => {
    let today = new Date();
    today = today.getTime();

    if (values.startDate === "" || values.startDate === null) return;
    if (values.endDate === "" || values.endtDate === null) return;

    const startDateInMilliSeconds = values.startDate?.getTime() || 0;
    const endDateInMilliSeconds = values.endDate?.getTime() || 0;

    if (option === "startDate")
      tempErrors.startDate =
        startDateInMilliSeconds < today ? "Should be greater than today." : "";

    if (option === "endDate")
      tempErrors.endDate =
        endDateInMilliSeconds < startDateInMilliSeconds
          ? "Should be greater than start date."
          : "";
  };

  const validate = (fieldValues = values) => {
    let tempErrors = {};

    if ("category" in fieldValues)
      tempErrors.category =
        fieldValues.category === "" ? "Required field." : "";

    if ("techStack" in fieldValues) {
      if (fieldValues.techStack?.length === 0) {
        tempErrors.techStack = "Required field.";
      } else if (fieldValues.techStack?.length > 5) {
        tempErrors.techStack = "Max 5 tags.";
      } else {
        tempErrors.techStack = "";
      }
    }

    if ("startDate" in fieldValues) compareDates(tempErrors, "startDate");

    if ("endDate" in fieldValues) compareDates(tempErrors, "endDate");

    if ("contact" in fieldValues)
      tempErrors.contact = fieldValues.contact === "" ? "Required field." : "";

    if ("title" in fieldValues)
      tempErrors.title = fieldValues.title === "" ? "Required field." : "";

    if ("content" in fieldValues) {
      tempErrors.content =
        fieldValues.content === 0 || fieldValues.content === ""
          ? "Required field."
          : "";
    }
    setErrors(tempErrors);

    if (fieldValues === values) {
      console.log("temperrors", tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
    }
  };

  return {
    errors,
    values,
    setValues,
    handleChange,
    validate,
  };
};

export default useProjectForm;
