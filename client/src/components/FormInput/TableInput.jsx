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

import AutoCompleteInput from "./AutoCompleteInput";

const TableInput = ({ roleOptions }) => {
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
            <TableRow>
              {/* ROLE */}
              <TableCell align="center">
                <AutoCompleteInput
                  options={roleOptions}
                  renderInput={(params) => (
                    <TextField {...params} required label="Role" />
                  )}
                />
              </TableCell>

              {/* NUMBER */}
              <TableCell align="center">
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </TableCell>

              {/* STATUS */}
              <TableCell align="center">
                <AutoCompleteInput
                  options={["opened", "filled"]}
                  renderInput={(params) => (
                    <TextField {...params} required label="Status" />
                  )}
                />
              </TableCell>

              {/* REMOVE */}
              <TableCell align="center">
                <div className="btn-wrapper">
                  <AddCircleOutlineIcon style={{ cursor: "pointer" }} />
                  <span className="divider">/</span> <DeleteOutlineIcon />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableInput;
