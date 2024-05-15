import { TableCell, TableRow, styled } from "@mui/material";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import myColors from "../../themes/colors";

export const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: myColors.backgroundGrey,
  },
}));

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  return (
    <StyledTableRow>
      <TableCell>{s.carrierName}</TableCell>
      <TableCell>{s.email}</TableCell>
      <TableCell>{s.phone}</TableCell>
      <TableCell>{s.address}</TableCell>
      <TableCell>{s.origin}</TableCell>
      <TableCell>{s.destination}</TableCell>
      <TableCell>{s.shipmentType}</TableCell>
      <TableCell>{s.shipmentWeight}</TableCell>
      <TableCell>{s.shipmentUnits}</TableCell>
      <TableCell>{s.pickUpDate.toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{s.deliveryDate.toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{s.bidAmount}</TableCell>
    </StyledTableRow>
  );
};

export default CarrierDashboardRow;
