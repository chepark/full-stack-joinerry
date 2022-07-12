import "./_textEditor.scss";
import { useState, useRef } from "react";

import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ handleChange, values, setValues, errors, validate }) => {
  const quillFormats = ["h1", "h2"];
  const quillRef = useRef();

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

  const renderQuillErrorMessage = () => {
    return (
      errors?.content && (
        <div className="ql-error-message">{errors.content}</div>
      )
    );
  };

  return (
    <div className="textEditor-wrapper">
      {console.log("ref", quillRef.getEditingArea)}
      <TextField
        sx={customTextFieldStyle}
        required
        label="Title"
        variant="standard"
        value={values?.title}
        onChange={(e) => {
          handleChange("title", e.target.value);
        }}
        error={errors.title ? true : undefined}
        helperText={errors.title}
      />

      <div>
        <ReactQuill
          theme="snow"
          placeholder="Explain about the project in detail."
          onChange={(contentHtml) =>
            setValues({ ...values, content: contentHtml })
          }
          onBlur={(e) => validate({ content: e.index })}
          ref={quillRef}
        />
      </div>
      {renderQuillErrorMessage()}
    </div>
  );
};

export default TextEditor;
