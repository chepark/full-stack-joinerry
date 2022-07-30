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
    setValue,
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

  console.log("content", getValues("content"));

  return (
    <div className="textEditor-wrapper" key={getValues("_id") || 0}>
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
          render={({ field }) => {
            return (
              <ReactQuill
                theme="snow"
                ref={quillRef}
                defaultValue={id ? getValues("content") : ""}
                onChange={(contentHtml) => {
                  setValue("content", contentHtml);
                }}
              />
            );
          }}
        />
      </div>
      {!!errors.content ? errors.content.message : ""}
    </div>
  );
};

export default TextEditor;
