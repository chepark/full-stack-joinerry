import "./_projectEditor.scss";
import { useEffect, useState } from "react";

import categoriesJson from "../../assets/categories.json";
import rolesJson from "../../assets/roles.json";
import tagsJson from "../../assets/techstacks.json";

import useWindowSize from "../../hooks/useWindowSize";
import AutoCompleteInput from "../FormInput/AutoCompleteInput";
import TableInput from "../FormInput/TableInput";

import TextField from "@mui/material/TextField";
import TimePickerInput from "../FormInput/TimePickerInput";
import TextEditor from "../TextEditor/TextEditor";

const ProjectEditor = ({ mode }) => {
  const [editorMode, setEditorMode] = useState(null);
  const [category, setCategory] = useState("latest");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(null);

  const categoryOptions = categoriesJson.categories;
  const roleOptions = rolesJson.roles;
  const tagOptions = tagsJson.teachstacks;

  useEffect(() => {
    setEditorMode(mode);
  }, [mode]);

  return (
    <div className="container" data-section="project-editor">
      <div className="content-wrapper" data-section="project-editor">
        <h2>Create Project</h2>
        {console.log(startDate)}
        <div className="editor-meta">
          <AutoCompleteInput
            onChange={(e) => {
              setCategory(e.target.textContent);
            }}
            options={categoryOptions}
            renderInput={(params) => (
              <TextField {...params} required label="Category" />
            )}
          />
          <AutoCompleteInput
            multiple
            limitTags={5}
            options={tagOptions}
            renderInput={(params) => (
              <TextField {...params} required label="Tech Stacks" />
            )}
          />
        </div>
        <div className="editor-roles">
          <TableInput roleOptions={roleOptions} />
        </div>
        <div className="editor-date">
          <TimePickerInput
            label="Start Date"
            inputFormat="MM/dd/yyyy"
            onChange={setStartDate}
          />
          <TimePickerInput
            label="End Date"
            inputFormat="MM/dd/yyyy"
            onChange={setEndDate}
          />
        </div>
        <div className="editor-contact">
          <TextField required label="Contact" />
        </div>
        <div className="editor-content">
          <TextEditor title={(title, setTitle, content, setContent)} />
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
