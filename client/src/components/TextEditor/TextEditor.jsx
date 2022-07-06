import "./_textEditor.scss";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ title, setTitle, content, setContent }) => {
  const CustomizedTextField = styled(TextField)(({ theme }) => ({
    // Change the default underline color to gray.
    "& .MuiInput-underline": {
      "&::before": {
        borderBottom: "1px solid #ccc",
      },
      // Change the underline border style on hover.
      "&:hover": {
        "&:before": {
          borderBottom: "1px solid black",
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
