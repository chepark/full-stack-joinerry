import "./_textEditor.scss";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useProjectForm from "../../hooks/useProjectForm";

const TextEditor = () => {
  const { handleChange, values, setValues, errors, validate } =
    useProjectForm();

  const quillFormats = ["h1", "h2"];

  return (
    <div className="textEditor-wrapper">
      <TextField
        sx={[
          {
            "& .MuiInput-underline": {
              "&::before": {
                borderBottom: "1px solid #ccc",
              },
              "&:hover": {
                "&:before": {
                  borderBottom: "1px solid black !important",
                },
              },
            },
          },
        ]}
        id="standard-basic"
        label="Title"
        variant="standard"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      <ReactQuill
        theme="snow"
        placeholder="Explain about the project in detail."
        onChange={(contentHtml) =>
          setValues({ ...values, content: contentHtml })
        }
        onBlur={(e) => validate({ content: e.index })}
      />
      {errors.content ? errors.content : null}
    </div>
  );
};

export default TextEditor;
