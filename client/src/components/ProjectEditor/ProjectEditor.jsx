import "./_projectEditor.scss";
import { useEffect, useState } from "react";

import categoriesJson from "../../assets/categories.json";
import rolesJson from "../../assets/roles.json";
import tagsJson from "../../assets/techstacks.json";

import AutoCompleteInput from "../FormInput/AutoCompleteInput";
import TableInput from "../FormInput/TableInput";
import TimePickerInput from "../FormInput/TimePickerInput";
import TextEditor from "../TextEditor/TextEditor";
import TextField from "@mui/material/TextField";

import useProjectForm from "../../hooks/useProjectForm";

const ProjectEditor = ({ mode }) => {
  const categoryOptions = categoriesJson.categories;
  const roleOptions = rolesJson.roles;
  const tagOptions = tagsJson.teachstacks;

  const [editorMode, setEditorMode] = useState(null);
  const { errors, values, setValues, handleChange, handleCancel, handleSave } =
    useProjectForm();

  useEffect(() => {
    setEditorMode(mode);
  }, [mode]);

  return (
    <div className="container" data-section="project-editor">
      <div className="content-wrapper" data-section="project-editor">
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
            multiple
            limitTags={5}
            value={values.teachStack || undefined}
            onChange={(e, newInput) => {
              handleChange("techStack", newInput);
            }}
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
          <TableInput roleOptions={roleOptions} />
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
              console.log("on error val,", value);
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
          <TextEditor />
        </div>
        <div className="editor-btns">
          {console.log("errors", errors)}
          <button className="editor-btn cancel">CANCEL</button>
          <button className="editor-btn save">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
