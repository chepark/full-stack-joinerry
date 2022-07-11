import "./_tableInput.scss";
import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
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
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import AutoCompleteInput from "./AutoCompleteInput";
import NumberFormat from "react-number-format";
import { NumberInput } from "./NumberInput";

const TableInputDup = ({ roleOptions }) => {
  const {
    roles,
    values,
    errors,
    handleInputChange,
    handleAdd,
    handleEdit,
    handleRemove,
  } = useTableForm(true);

  const handleAddClick = (e) => {
    e.preventDefault();
    handleAdd();
  };

  const renderRows = () => {
    return roles.map((role) => {
      let id = role?.id ? role.id : uuidV4();
      return (
        <TableRow key={id}>
          <TableCell align="center">{role.role}</TableCell>

          <TableCell align="center">{role.number}</TableCell>

          <TableCell align="center">{role.isOpened}</TableCell>

          <TableCell align="center">
            <div className="btn-wrapper">
              <ModeEditOutlineOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(role)}
              />{" "}
              |
              <DeleteOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleRemove(role)}
              />
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderLastRow = () => {
    return (
      <TableRow key={0}>
        <TableCell align="center">
          <AutoCompleteInput
            value={values.role || null}
            onInputChange={(e, newInput) => {
              handleInputChange("role", newInput);
            }}
            options={roleOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Select role"
                error={errors.role ? true : undefined}
                helperText={errors.role}
              />
            )}
          />
        </TableCell>

        <TableCell align="center">
          <NumberFormat
            customInput={TextField}
            value={values.number}
            onValueChange={(values) =>
              handleInputChange("number", values.value)
            }
            error={errors.number ? true : undefined}
            helperText={errors.number}
          />
        </TableCell>

        <TableCell align="center">
          <AutoCompleteInput
            value={values.isOpened || null}
            onInputChange={(e, newInput) => {
              handleInputChange("isOpened", newInput);
            }}
            options={["opened", "filled"]}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Select status"
                error={errors.isOpened ? true : undefined}
                helperText={errors.isOpened}
              />
            )}
          />
        </TableCell>

        <TableCell align="center">
          <div className="btn-wrapper" onClick={handleAddClick}>
            <AddCircleOutlineIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => handleAddClick(e)}
            />{" "}
            ADD ROLE
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        {console.log("saved roles:", roles)}

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Number of Openings</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Edit / Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.length > 0 && renderRows()}
            {renderLastRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableInputDup;
