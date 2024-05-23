import { IShipperDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";

const ShipperDashboardRow = (s: IShipperDashboard) => {
  return (
    <StyledTableRow>
      <StyledTableCell>{s.shipperName}</StyledTableCell>
      <StyledTableCell>{s.email}</StyledTableCell>
      <StyledTableCell>{s.phone}</StyledTableCell>
      <StyledTableCell>{s.address}</StyledTableCell>
      <StyledTableCell>{s.origin}</StyledTableCell>
      <StyledTableCell>{s.destination}</StyledTableCell>
      <StyledTableCell>{s.shipmentType}</StyledTableCell>
      <StyledTableCell>{s.shipmentWeight}</StyledTableCell>
      <StyledTableCell>
        {s.pickUpDate.toLocaleDateString("en-GB")}
      </StyledTableCell>
      <StyledTableCell>
        {s.deliveryDate.toLocaleDateString("en-GB")}
      </StyledTableCell>
      <StyledTableCell>{s.bidAmount}</StyledTableCell>
    </StyledTableRow>
  );
};

export default ShipperDashboardRow;
