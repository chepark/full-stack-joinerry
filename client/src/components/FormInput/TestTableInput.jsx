import "./_tableInput.scss";

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

const TestTableInput = ({ roleOptions }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "roles",
    keyName: "roleId",
  });

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
                              return (
                                <TextField
                                  {...params}
                                  error={
                                    errors?.roles &&
                                    !!errors?.roles[index]?.role
                                  }
                                  helperText={
                                    errors?.roles &&
                                    errors.roles[index]?.role?.message
                                  }
                                />
                              );
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
                            error={
                              errors?.roles && !!errors.roles[index]?.number
                            }
                            helperText={
                              errors?.roles &&
                              errors.roles[index]?.number?.message
                            }
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
                              return (
                                <TextField
                                  {...params}
                                  error={
                                    errors?.roles &&
                                    !!errors.roles[index]?.isOpened
                                  }
                                  helperText={
                                    errors?.roles &&
                                    errors.roles[index]?.isOpened?.message
                                  }
                                />
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <div className="btn-wrapper">
                      <DeleteOutlineIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => remove(index)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="add-btn-wrapper">
          <span
            onClick={() => {
              insert(parseInt(2, 19), {
                role: "",
                number: 0,
                isOpened: "",
              });
            }}
          >
            + Add Role
          </span>
        </div>
      </TableContainer>
    </>
  );
};

export default TestTableInput;
