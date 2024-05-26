import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IShipperDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { IconButton } from "@mui/material";

const ShipperDashboardRow = (s: IShipperDashboard) => {
  return (
    <StyledTableRow>
      <StyledTableCell>{s.invoice}</StyledTableCell>
      <StyledTableCell>{s.carrierName}</StyledTableCell>
      <StyledTableCell>{s.email}</StyledTableCell>
      <StyledTableCell>{s.phone}</StyledTableCell>
      <StyledTableCell>{s.address}</StyledTableCell>
      <StyledTableCell>{s.origin}</StyledTableCell>
      <StyledTableCell>{s.destination}</StyledTableCell>
      <StyledTableCell>{s.shipmentType}</StyledTableCell>
      <StyledTableCell>{s.shipmentWeightVolume}</StyledTableCell>
      <StyledTableCell>
        {s.pickupDateTime.toLocaleDateString("en-GB")}
      </StyledTableCell>
      <StyledTableCell>
        {s.deliveryDateTime.toLocaleDateString("en-GB")}
      </StyledTableCell>
      <StyledTableCell>{s.bidAmount}</StyledTableCell>
      <StyledTableCell onClick={(e) => e.stopPropagation()}>
        <IconButton
          size="small"
          // onClick={(event) => handleEdit(event)}
          sx={{ p: 0 }}
        >
          <AttachMoneyIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ShipperDashboardRow;
