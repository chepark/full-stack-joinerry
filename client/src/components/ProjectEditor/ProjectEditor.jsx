import "./_projectEditor.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import categoriesJson from "../../data/categories.json";
import rolesJson from "../../data/roles.json";
import tagsJson from "../../data/techstacks.json";

import AutoCompleteInput from "../FormInput/AutoCompleteInput";
import TableInput from "../FormInput/TableInput";
import TimePickerInput from "../FormInput/TimePickerInput";
import TextEditor from "../TextEditor/TextEditor";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import useProjectForm from "../../hooks/useProjectForm";
import useUserContext from "../../hooks/useUserContext";

const ProjectEditor = ({ mode }) => {
  const categoryOptions = categoriesJson.categories;
  const roleOptions = rolesJson.roles;
  const tagOptions = tagsJson.teachstacks;

  const { user } = useUserContext();
  const [editorMode, setEditorMode] = useState(null);
  const [onSubmit, setOnSubmit] = useState(false);
  const { errors, values, setValues, handleChange, validate } =
    useProjectForm();

  const navigate = useNavigate();

  useEffect(() => {
    setEditorMode(mode);
  }, [mode]);

  const createProject = async () => {
    const project = { ...values, creator: user._id };
    console.log("user id in editor", user);
    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("Erros in POST request.", json.error);
      setOnSubmit(false);
    }

    if (response.ok) {
      console.log("response ok");
      setValues({
        category: "",
        techStack: [],
        roles: [],
        startDate: null,
        endDate: null,
        contact: "",
        title: "",
        content: "",
      });

      setOnSubmit(false);
      navigate("/dashboard", { replace: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setSubmit(true); // If onSubmit is true, TableInput validates role values.
    setOnSubmit(true);

    if (!validate(values)) {
      console.log("validate fail", errors);
      return;
    }

    createProject();
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="container" data-section="project-editor">
      <form
        className="content-wrapper"
        data-section="project-editor"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2>Create Project</h2>

        <div className="editor-meta">
          <AutoCompleteInput
            value={values.category || null}
            onInputChange={(e, newInput) => {
              handleChange("category", newInput);
            }}
            options={categoryOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Category"
                error={errors?.category ? true : undefined}
                helperText={errors.category}
              />
            )}
          />
          <AutoCompleteInput
            value={values.teachStack || undefined}
            onChange={(e, newInput) => {
              handleChange("techStack", newInput);
            }}
            multiple
            limitTags={5}
            options={tagOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Tech Stacks"
                error={errors?.techStack ? true : undefined}
                helperText={errors.techStack}
              />
            )}
          />
        </div>
        <div className="editor-roles">
          <TableInput
            roleOptions={roleOptions}
            setFormValues={setValues}
            formValues={values}
            onSubmit={onSubmit}
            setOnSubmit={setOnSubmit}
          />
        </div>
        <div className="editor-date">
          <TimePickerInput
            label="Start Date"
            value={values.startDate}
            onChange={(newValue) => handleChange("startDate", newValue)}
            inputFormat="MM/dd/yyyy"
            disablePast
            onError={(reasons, value) => {
              console.log("reasons", reasons);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.startDate ? true : undefined}
                helperText={errors.startDate}
              />
            )}
          />
          <TimePickerInput
            label="End Date"
            value={values.endDate}
            onChange={(newValue) => handleChange("endDate", newValue)}
            inputFormat="MM/dd/yyyy"
            disablePast
            minDate={values.startDate ? values.startDate : false}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.endDate ? true : undefined}
                helperText={errors.endDate}
              />
            )}
          />
        </div>
        <div className="editor-contact">
          <TextField
            required
            label="Contact"
            value={values.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            error={errors.contact ? true : undefined}
            helperText={errors.contact}
          />
        </div>
        <div className="editor-content">
          <TextEditor
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            errors={errors}
            validate={validate}
          />
        </div>
        <div className="editor-btns">
          <button className="editor-btn cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="editor-btn publish" type="submit">
            PUBLISH
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditor;
