import "./_projectEditor.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import categoriesJson from "../../data/categories.json";
import rolesJson from "../../data/roles.json";
import tagsJson from "../../data/techstacks.json";

import TextEditor from "../TextEditor/TextEditor";

import CircularProgress from "@mui/material/CircularProgress";

import useProjectForm from "../../hooks/useProjectForm";
import useUserContext from "../../hooks/useUserContext";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TestTableInput from "../FormInput/TestTableInput";
import TestTextEditor from "../TextEditor/TestTextEditor";
import { projectFormSchema } from "../../utils/projectFormSchema";

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
    roles: [{ role: "", number: null, isOpened: "" }],
    startDate: null,
    endDate: null,
    contact: "",
    title: "",
    content: "",
  });

  const { handleChange, validate } = useProjectForm();

  const navigate = useNavigate();

  const schema = yup.object().shape(projectFormSchema);

  const defaultValues = {
    category: "",
    techStack: [],
    roles: [{ role: "", number: 0, isOpened: "" }],
    startDate: null,
    contact: "",
    title: "",
    content: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

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

  const onError = (data) => {
    console.log("error", data);
  };
  console.log(watch());

  return (
    <div className="container" data-section="project-editor">
      <FormProvider {...methods}>
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
            <TestTableInput
              values={values}
              setValues={setValues}
              roleOptions={roleOptions}
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

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      label="End Date"
                      onChange={(value) => {
                        field.onChange(value);
                        setValues({ ...values, endDate: value });
                      }}
                      value={values.endDate}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            error={errors.endDate}
                            helperText={
                              errors.endDate ? errors.endDate.message : ""
                            }
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                );
              }}
            />
          </div>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Contact"
                  error={errors.contact}
                  helperText={errors.contact ? errors.contact.message : ""}
                />
              );
            }}
          />

          <div className="editor-content">
            <TestTextEditor
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
      </FormProvider>
    </div>
  );
};

export default TestProjectEditor;
