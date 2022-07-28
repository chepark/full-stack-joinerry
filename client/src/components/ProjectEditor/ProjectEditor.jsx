import "./_projectEditor.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import categoriesJson from "../../data/categories.json";
import rolesJson from "../../data/roles.json";
import tagsJson from "../../data/techstacks.json";

import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/projectFormSchema";

import TableInput from "../TableInput/TableInput";
import TextEditor from "../TextEditor/TextEditor";
import useUserContext from "../../hooks/useUserContext";

const ProjectEditor = () => {
  const categoryOptions = categoriesJson.categories;
  const roleOptions = rolesJson.roles;
  const tagOptions = tagsJson.teachstacks;

  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const defaultValues = {
    category: "",
    techStack: [],
    roles: [{ role: "", number: 0, isOpened: "" }],
    startDate: null,
    endDate: null,
    contact: "",
    title: "",
    content: "",
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch("http://localhost:4000/api/projects/" + id);
      const json = await response.json();
      let project = json;

      if (project.startDate)
        project.startDate = convertIsoStringToDateObj(project.startDate);

      if (project.endDate)
        project.endDate = convertIsoStringToDateObj(project.endDate);

      methods.reset(project);
    };

    if (!id) return;
    fetchProject();
  }, [id]);

  const convertIsoStringToDateObj = (isoString) => {
    const DateObj = new Date(isoString.slice(0, -1));
    return DateObj;
  };

  const createProject = async (values, project) => {
    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
    }

    if (response.ok) {
      console.log(json);
      setLoading(false);
      navigate("/dashboard/posts", { replace: true });
    }
  };

  const editProject = async (values, project) => {
    const response = await fetch("http://localhost:4000/api/projects/" + id, {
      method: "PUT",
      body: JSON.stringify(project),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    navigate("/dashboard/posts", { replace: true });
  };

  const onSubmit = async (data) => {
    let project = { ...data, creator: user._id };

    if (id) editProject(data, project);

    if (!id) createProject(data, project);
  };

  const onError = (data) => {
    console.log("error", data);
  };

  console.log("inputs", watch());
  console.log("errors", errors);

  const handleCancel = () => {
    navigate("/dashboard/posts", { replace: true });
  };

  return (
    <div className="container" data-section="project-editor">
      <FormProvider {...methods}>
        <form
          className="content-wrapper"
          data-section="project-editor"
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h2>{id ? "Edit Project" : "Create Project"}</h2>

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
                      return value;
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.id === value.id
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Category"
                          error={!!errors.category}
                          helperText={errors?.category?.message}
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
                      return value;
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.id === value.id
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Tech Stacks"
                          error={!!errors.techStack}
                          helperText={errors?.techStack?.message}
                        />
                      );
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="editor-roles">
            <TableInput roleOptions={roleOptions} />
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
                        methods.setValue("startDate", new Date(value));
                        // setValues({ ...values, startDate: value });
                      }}
                      // value={values.startDate}
                      value={methods.getValues("startDate")}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            error={!!errors.startDate}
                            helperText={errors?.startDate?.message}
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
                        // setValues({ ...values, endDate: value });
                        methods.setValue("endDate", new Date(value));
                      }}
                      // value={values.endDate}
                      value={methods.getValues("endDate")}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            error={!!errors.endDate}
                            helperText={errors?.endDate?.message}
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
                  error={!!errors.contact}
                  helperText={errors?.contact?.message}
                />
              );
            }}
          />

          <div className="editor-content">
            <TextEditor />
          </div>
          <div className="editor-btns">
            <button className="editor-btn cancel" onClick={handleCancel}>
              CANCEL
            </button>
            <button className="editor-btn publish" type="submit">
              {id ? "EDIT" : "PUBLISH"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProjectEditor;
