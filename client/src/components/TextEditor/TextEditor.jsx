import "./_textEditor.scss";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ title, setTitle, content, setContent }) => {
  const CustomizedTextField = styled(TextField)(({ theme }) => ({
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
  }));

  return (
    <div className="textEditor-wrapper">
      <CustomizedTextField
        id="standard-basic"
        label="Title"
        variant="standard"
      />
      <ReactQuill theme="snow" onChange={setContent} />
    </div>
  );
};

export default TextEditor;
