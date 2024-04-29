import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import myColors from "../themes/colors";
import { IShipperDashboardColumn } from "../interfaces/interfaces";
import { shipper_columns } from "../utility/constants";
import ShipperDashboardRow from "../components/shipperDashboard/ShipperDashboardRow";
import { useState } from "react";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const ShipperDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowData = {
    shipperName: "John Doe",
    email: "john.doe@email.com",
    phone: "9999999999",
    address: "Mars",
    origin: "Moon",
    destination: "Hell",
    shipmentType: "LTL",
    shipmentWeight: "44",
    shipmentUnits: "Tonnes",
    pickUpDate: new Date(),
    deliveryDate: new Date(),
    bidAmount: "10 Crore",
  };

  const rows = Array.from({ length: 20 }, (_, index) => (
    <ShipperDashboardRow key={index} {...rowData} />
  ));

  return (
    <Box padding={10}>
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
        Shipper Dashboard
      </Typography>
      <TableContainer
        sx={{ border: "1px solid", borderColor: myColors.backgroundGreyV2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: myColors.yellow.main }}>
            <TableRow>
              {shipper_columns.map((column: IShipperDashboardColumn) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={rows.length}
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

export default ShipperDashboard;
