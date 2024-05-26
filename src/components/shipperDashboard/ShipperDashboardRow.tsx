import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IShipperDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { IconButton } from "@mui/material";
import { Download } from "@mui/icons-material";

const ShipperDashboardRow = (s: IShipperDashboard) => {
  const renderCellContent = (content: string) => {
    return content ? content : "N/A";
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{renderCellContent(s.invoice)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.carrierName)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.carrierEmail)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.carrierPhone)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.carrierAddress)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.origin)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.destination)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.shipmentType)}</StyledTableCell>
      <StyledTableCell>
        {renderCellContent(s.shipmentWeightVolume)}
      </StyledTableCell>
      <StyledTableCell>
        {renderCellContent(new Date(s.pickupDateTime).toLocaleDateString())}
      </StyledTableCell>
      <StyledTableCell>
        {renderCellContent(new Date(s.deliveryDateTime).toLocaleDateString())}
      </StyledTableCell>
      <StyledTableCell>{renderCellContent(s.bidAmount)}</StyledTableCell>
      <StyledTableCell onClick={(e) => e.stopPropagation()}>
        <IconButton size="small" onClick={() => console.log("Payment Portal")}>
          <AttachMoneyIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => console.log("Download Invoice")}
        >
          <Download fontSize="small" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ShipperDashboardRow;
