import "./_textEditor.scss";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Controller, useFormContext } from "react-hook-form";

const TextEditor = () => {
  const { id } = useParams();

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const initialHtml = getValues("content");
      return setContent(initialHtml);
    }
    return;
  }, [getValues]);

  const quillFormats = ["h1", "h2"];
  const quillRef = useRef();

  const customTextFieldStyle = [
    {
      marginBottom: "1rem",
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
    <div className="textEditor-wrapper" key={getValues("_id") || 0}>
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
          render={({ field }) => {
            return (
              <ReactQuill
                className={errors.content ? "ql-error" : null}
                theme="snow"
                ref={quillRef}
                defaultValue={id ? getValues("content") : ""}
                onChange={(contentHtml) => {
                  // setValue("content", contentHtml);
                  field.onChange(contentHtml);
                }}
              />
            );
          }}
        />
      </div>
      {!!errors.content ? (
        <div className="ql-error__message">{errors.content.message}</div>
      ) : null}
    </div>
  );
};

export default TextEditor;
