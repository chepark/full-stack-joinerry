import "./_textEditor.scss";
import { useRef } from "react";

import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Controller, useFormContext } from "react-hook-form";
import { unstable_getThemeValue } from "@mui/system";

const TestTextEditor = () => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

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

  return (
    <div className="textEditor-wrapper">
      {console.log("ref", quillRef.getEditingArea)}

      <Controller
        name="title"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              sx={customTextFieldStyle}
              variant="standard"
              {...field}
              label="Title"
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
          );
        }}
      />

      <div>
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange } }) => {
            return (
              <ReactQuill
                theme="snow"
                ref={quillRef}
                onChange={(contentHtml) => onChange(contentHtml)}
                value={getValues("content")}
              />
            );
          }}
        />
      </div>
      {!!errors.content ? errors.content.message : ""}
    </div>
  );
};

export default TestTextEditor;
