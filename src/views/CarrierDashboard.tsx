import {
  Box,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useState } from "react";
import CarrierDashboardRow from "../components/carrierDashboard/CarrierDashboardRow";
import { ICarrierDashboardColumn } from "../interfaces/interfaces";
import myColors from "../themes/colors";
import { carrier_columns } from "../utility/constants";
import { Search } from "@mui/icons-material";
import { ScrollbarStyles } from "../components/common/styled";

const CarrierDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const rowData = {
    invoice: "123",
    shipperName: "John Doe",
    email: "john.doe@email.com",
    phone: "9999999999",
    address: "Mars",
    origin: "Moon",
    destination: "Hell",
    shipmentType: "LTL",
    shipmentWeight: "44",
    pickUpDate: new Date(),
    deliveryDate: new Date(),
    bidAmount: "10 Crore",
  };

  const rows = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    ...rowData,
  }));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box padding={8}>
      <Typography
        sx={{
          color: myColors.textBlack,
          maxWidth: "580px",
        }}
        variant="h2"
        fontSize={"45px"}
        fontWeight={600}
        paddingBottom={10}
      >
        Carrier Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: "auto" }}
        />
      </Box>
      <TableContainer
        sx={{
          border: "1px solid",
          borderColor: myColors.backgroundGreyV2,
          ...ScrollbarStyles,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: myColors.yellow.main }}>
            <TableRow>
              {carrier_columns.map((column: ICarrierDashboardColumn) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <CarrierDashboardRow key={row.id} {...row} />
              ))}{" "}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CarrierDashboard;
