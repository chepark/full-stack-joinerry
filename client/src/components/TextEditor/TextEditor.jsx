import "./_textEditor.scss";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useProjectForm from "../../hooks/useProjectForm";

const TextEditor = () => {
  const { handleChange, values, setValues } = useProjectForm();
  const CustomizedTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInput-underline": {
      "&::before": {
        borderBottom: "1px solid #ccc",
      },
      // "&:hover": {
      //   "&:before": {
      //     borderBottom: "1px solid black !important",
      //   },
      // },
    },
  }));

  return (
    <div className="textEditor-wrapper">
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      <ReactQuill
        theme="snow"
        onChange={(editor) => console.log("editr", editor)}
      />
    </div>
  );
};

export default TextEditor;
