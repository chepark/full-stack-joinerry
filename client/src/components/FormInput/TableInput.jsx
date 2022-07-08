import "./_tableInput.scss";
import { useState, useEffect } from "react";

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

import { NumberInput } from "./NumberInput";

const TableInput = ({ roleOptions }) => {
  const [roles, setRoles] = useState([]);

  const [errors, setErrors] = useState({});

  const [newRole, setNewRole] = useState(null);
  const [num, setNum] = useState(0);
  const [isOpened, setIsOpened] = useState(null);
  const [tempId, setTempId] = useState(1);

  const handleAddClick = () => {
    validateInputs();
    console.log(errors);

    let isError = Object.values(errors).every(Boolean);

    if (isError) return;
    else console.log("ADD");
    // addRole(tempId, newRole, num, isOpened);
    // resetValues();
  };

  const handleRemoveClick = (id) => {
    deleteRole(id);
  };

  const addRole = (tempId, newRole, num, isOpened) => {
    const roleToAdd = {
      id: tempId,
      role: newRole,
      number: num,
      isOpened: isOpened,
    };

    setRoles((roles) => {
      return [...roles, roleToAdd];
    });
    setTempId((tempId) => {
      return tempId + 1;
    });
  };

  const deleteRole = (id) => {
    const updatedRoles = roles.filter((role) => {
      if (role._id) {
        return role._id !== id;
      } else {
        return role.tempId !== id;
      }
    });

    // setProject((prevState) => {
    //   return { ...prevState, roles: updatedRoles };
    // });
  };

  const resetValues = () => {
    setNewRole((prevState) => {
      return null;
    });
    setNum((prevState) => {
      return 0;
    });
    setIsOpened((prevState) => {
      return null;
    });
  };

  const validateInputs = () => {
    if (!newRole)
      setErrors((errors) => {
        return { ...errors, newRole: true };
      });

    if (num === 0 || !num)
      setErrors((errors) => {
        return { ...errors, num: true };
      });

    if (!isOpened)
      setErrors((errors) => {
        return { ...errors, isOpened: true };
      });
  };

  const handleChange = (section, newInput) => {
    switch (section) {
      case "newRole":
        setErrors({ ...errors, newRole: undefined });
        return setNewRole(newInput);
      case "num":
        setErrors({ ...errors, num: undefined });
        return setNum(newInput);
      case "isOpened":
        setErrors({ ...errors, isOpened: undefined });
        return setIsOpened(newInput);
      default:
        return;
    }
  };

  const renderRows = () => {
    return roles.map((role) => {
      let id = role?.id ? role.id : tempId;
      return (
        <TableRow key={id}>
          <TableCell align="center">{role.role}</TableCell>

          <TableCell align="center">{role.number}</TableCell>

          <TableCell align="center">{role.isOpened}</TableCell>

          <TableCell align="center">
            <div className="btn-wrapper" onClick={handleAddClick}>
              <ModeEditOutlineOutlinedIcon style={{ cursor: "pointer" }} /> |
              <DeleteOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={handleRemoveClick(id)}
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
            name="newRole"
            value={newRole}
            onInputChange={(e, newInput) => {
              console.log(e);
            }}
            options={roleOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Select role"
                error={errors.newRole ? true : undefined}
                helperText={errors.newRole ? "Required field" : undefined}
              />
            )}
          />
        </TableCell>

        <TableCell align="center">
          <TextField
            sx={{ width: "150px" }}
            label="Type in number"
            value={num}
            onChange={(e) => {
              handleChange(e.target.value.name);
            }}
            InputProps={{
              inputComponent: NumberInput,
            }}
            error={errors.num ? true : undefined}
            helperText={errors.num ? "Must be greater than 0." : undefined}
          />
        </TableCell>

        <TableCell align="center">
          <AutoCompleteInput
            name="isOpened"
            value={isOpened}
            onInputChange={(e, newInput) => {
              console.log(e.target.name);
            }}
            options={["opened", "filled"]}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Select status"
                error={errors.isOpened ? true : undefined}
                helperText={errors.isOpened ? "Required field" : undefined}
              />
            )}
          />
        </TableCell>

        <TableCell align="center">
          <div className="btn-wrapper" onClick={handleAddClick}>
            <AddCircleOutlineIcon style={{ cursor: "pointer" }} /> ADD ROLE
          </div>
        </TableCell>
      </TableRow>
    );
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

export default TableInput;