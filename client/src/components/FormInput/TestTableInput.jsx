import "./_tableInput.scss";

import useTableForm from "../../hooks/useTableForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { Autocomplete } from "@mui/material";

const TestTableInput = ({
  setFormValues,
  formValues,

  values,
  setValues,
  roleOptions,
}) => {
  const { control, watch, formState } = useFormContext();
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "roles",
    keyName: "roleId",
  });

  console.log("roles are ", watch("roles"));

  const handleEdit = (roleToEdit) => {
    const { role, number, isOpened } = roleToEdit;
    // put the value to the last row.
    setValues({ role: role, number: number, isOpened: isOpened });

    if (formValues.roles.length > 1) {
      const otherRoles = formValues.roles.filter((role) => {
        return role.role !== roleToEdit.role;
      });

      setFormValues({ ...formValues, roles: otherRoles });
    } else {
      setFormValues({ ...formValues, roles: [] });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Number of Openings</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Add / Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => {
              return (
                <TableRow key={item.roleId}>
                  <TableCell>
                    <Controller
                      name={`roles.${index}.role`}
                      control={control}
                      defaultValue={item.role}
                      render={({ field }) => {
                        return (
                          <Autocomplete
                            {...field}
                            size="small"
                            options={roleOptions}
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
                              return <TextField {...params} />;
                            }}
                          />
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Controller
                      name={`roles.${index}.number`}
                      control={control}
                      defaultValue={item.number}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            size="small"
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                          />
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Controller
                      name={`roles.${index}.isOpened`}
                      control={control}
                      defaultValue={item.isOpened}
                      render={({ field }) => {
                        return (
                          <Autocomplete
                            {...field}
                            size="small"
                            options={["opened", "filled"]}
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
                              return <TextField {...params} />;
                            }}
                          />
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <div className="btn-wrapper">
                      {fields.length === index + 1 && (
                        <>
                          <AddCircleOutlineIcon
                            onClick={() => {
                              insert(parseInt(2, 19), {
                                role: "",
                                number: 0,
                                isOpened: "",
                              });
                            }}
                          />
                          /
                          <DeleteOutlineIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => remove(index)}
                          />
                        </>
                      )}
                      {index + 1 < fields.length && (
                        <DeleteOutlineIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => remove(index)}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TestTableInput;
