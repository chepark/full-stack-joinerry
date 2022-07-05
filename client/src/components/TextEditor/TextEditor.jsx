import "./_textEditor.scss";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ title, setTitle, content, setContent }) => {
  return (
    <div className="textEditor-wrapper">
      <TextField id="standard-basic" label="Title" variant="standard" />
      <ReactQuill theme="snow" onChange={setContent} />
    </div>
  );
};

export default TextEditor;
