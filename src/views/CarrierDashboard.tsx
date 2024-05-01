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
import { ICarrierDashboardColumn } from "../interfaces/interfaces";
import { carrier_columns } from "../utility/constants";
import { useState } from "react";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import CarrierDashboardRow from "../components/carrierDashboard/CarrierDashboardRow";

const CarrierDashboard = () => {
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
    carrierName: "John Doe",
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
    <CarrierDashboardRow key={index} {...rowData} />
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
        Carrier Dashboard
      </Typography>
      <TableContainer
        sx={{
          border: "1px solid",
          borderColor: myColors.backgroundGreyV2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: myColors.yellow.main }}>
            <TableRow>
              {carrier_columns.map((column: ICarrierDashboardColumn) => (
                <TableCell key={column.id} sx={{ minWidth: 150 }}>
                  {column.label}
                </TableCell>
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

export default CarrierDashboard;
