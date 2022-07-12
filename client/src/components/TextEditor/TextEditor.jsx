import "./_textEditor.scss";
import { useState } from "react";

import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ handleChange, values, setValues, errors, validate }) => {
  const quillFormats = ["h1", "h2"];

  const customTextFieldStyle = [
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
  ];

  return (
    <div className="textEditor-wrapper">
      <TextField
        sx={customTextFieldStyle}
        id="standard-basic"
        label="Title"
        variant="standard"
        value={values?.title}
        onChange={(e) => {
          handleChange("title", e.target.value);
        }}
        error={errors.title ? true : undefined}
        helperText={errors.title}
      />
      <ReactQuill
        theme="snow"
        placeholder="Explain about the project in detail."
        onChange={(contentHtml) =>
          setValues({ ...values, content: contentHtml })
        }
        onBlur={(e) => validate({ content: e.index })}
      />
      {errors?.content ? errors.content : null}
    </div>
  );
};

export default TextEditor;
