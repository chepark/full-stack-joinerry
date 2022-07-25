import "./_projectEditor.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import categoriesJson from "../../data/categories.json";
import rolesJson from "../../data/roles.json";
import tagsJson from "../../data/techstacks.json";

import AutoCompleteInput from "../FormInput/AutoCompleteInput";
import TableInput from "../FormInput/TableInput";
import TimePickerInput from "../FormInput/TimePickerInput";
import TextEditor from "../TextEditor/TextEditor";

import CircularProgress from "@mui/material/CircularProgress";

import useProjectForm from "../../hooks/useProjectForm";
import useUserContext from "../../hooks/useUserContext";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getNativeSelectUtilityClasses } from "@mui/material";

const TestProjectEditor = ({ mode, projectId }) => {
  const categoryOptions = categoriesJson.categories;
  const roleOptions = rolesJson.roles;
  const tagOptions = tagsJson.teachstacks;

  const { user } = useUserContext();
  const [editorMode, setEditorMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    category: null,
    techStack: [],
    roles: [],
    startDate: null,
    endDate: null,
    contact: "",
    title: "",
    content: "",
  });

  const { handleChange, validate } = useProjectForm();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    category: yup
      .string()
      .oneOf(categoryOptions, "Select one from the given options.")
      .required("Required"),
    techStack: yup
      .array()
      .of(yup.string())
      .min(1, "At least 1 tag.")
      .max(5, "Max 5 tags")
      .required("Required"),
    roles: yup.array().of(
      yup.object().shape({
        roles: yup.string(),
        number: yup.number(),
        isOpened: yup.string(),
      })
    ),
    startDate: yup.date(),
    endDate: yup.date().when("startDate", (startDate, schema) => {
      if (startDate) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
        return schema.min(dayAfter, "Must be after start date.");
      }
      return schema;
    }),
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      techStack: [],
      startDate: null,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("category", null);
    setValue("techStack", []);
  }, [useForm]);

  useEffect(() => {
    setEditorMode(mode);
  }, [mode]);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(
        "http://localhost:4000/api/projects/" + projectId
      );
      const json = await response.json();
      setValues(json);
    };

    if (editorMode === "edit") fetchProject();
  }, [editorMode]);

  const createProject = async () => {
    const project = { ...values, creator: user._id };
    console.log("user id in editor", user);
    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("Erros in POST request.", json.error);
      setLoading(false);
    }

    if (response.ok) {
      console.log("response ok");
      setValues({
        category: "",
        techStack: [],
        roles: [],
        startDate: null,
        endDate: null,
        contact: "",
        title: "",
        content: "",
      });

      setLoading(false);
      navigate("/dashboard/posts", { replace: true });
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    // setSubmit(true); // If onSubmit is true, TableInput validates role values.
    setLoading(true);

    if (!validate(values)) {
      console.log("validate fail", errors);
      return;
    }

    createProject();
  };

  const handleCancel = () => {
    navigate("/dashboard/posts", { replace: true });
  };

  const handleEdit = async () => {
    //! check if the creator and user id matches.
    //! if it matches, take the value and update data.
    const project = { ...values, creator: user._id };
    const response = await fetch(
      "http://localhost:4000/api/projects/" + projectId,
      {
        method: "PUT",
        body: JSON.stringify(project),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("updatedData", data);
    navigate("/dashboard/posts", { replace: true });
  };

  const onSubmit = async (data) => {
    if (editorMode === "edit") {
      return console.log("edit! data:", data);
    }
    console.log("add ! data: ", data);
  };

  console.log(watch());
  const onError = (data) => {
    console.log("error", data);
  };

  return (
    <div className="container" data-section="project-editor">
      <form
        className="content-wrapper"
        data-section="project-editor"
        noValidate
        onSubmit={handleSubmit(handleSubmitClick, onError)}
      >
        <h2>{mode === "edit" ? "Edit Project" : "Create Project"}</h2>

        <div className="editor-meta">
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  options={categoryOptions}
                  onChange={(e, value) => {
                    field.onChange(value);
                    setValues({ ...values, category: value });
                    return value;
                  }}
                  value={values.category}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Category"
                        error={errors.category}
                        helperText={
                          errors.category ? errors.category.message : ""
                        }
                      />
                    );
                  }}
                />
              );
            }}
          />

          <Controller
            name="techStack"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  multiple
                  options={tagOptions}
                  onChange={(e, value) => {
                    field.onChange(value);
                    setValues({ ...values, techStack: value });
                    return value;
                  }}
                  value={values.techStack}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Tech Stacks"
                        error={errors.techStack}
                        helperText={
                          errors.techStack ? errors.techStack.message : ""
                        }
                      />
                    );
                  }}
                />
              );
            }}
          />
        </div>

        <div className="editor-roles">
          <TableInput
            roleOptions={roleOptions}
            setFormValues={setValues}
            formValues={values}
            onSubmit={loading}
            setOnSubmit={setLoading}
          />
        </div>

        <div className="editor-date">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Start Date"
                    onChange={(value) => {
                      field.onChange(value);
                      setValues({ ...values, startDate: value });
                    }}
                    value={values.startDate}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          error={errors.startDate}
                          helperText={
                            errors.startDate ? errors.startDate.message : ""
                          }
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
              );
            }}
          />

          {/* <TimePickerInput
            label="Start Date"
            value={values.startDate}
            onChange={(newValue) => handleChange("startDate", newValue)}
            inputFormat="MM/dd/yyyy"
            disablePast
            onError={(reasons, value) => {
              console.log("reasons", reasons);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.startDate ? true : undefined}
                helperText={errors.startDate}
              />
            )}
          /> */}
          <TimePickerInput
            label="End Date"
            value={values.endDate}
            onChange={(newValue) => handleChange("endDate", newValue)}
            inputFormat="MM/dd/yyyy"
            disablePast
            minDate={values.startDate ? values.startDate : false}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.endDate ? true : undefined}
                helperText={errors.endDate}
              />
            )}
          />
        </div>
        <div className="editor-contact">
          <TextField
            required
            label="Contact"
            value={values.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            error={errors.contact ? true : undefined}
            helperText={errors.contact}
          />
        </div>
        <div className="editor-content">
          <TextEditor
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            errors={errors}
            validate={validate}
          />
        </div>
        <div className="editor-btns">
          <button className="editor-btn cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="editor-btn publish" type="submit">
            {editorMode === "edit" ? "EDIT" : "PUBLISH"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestProjectEditor;
