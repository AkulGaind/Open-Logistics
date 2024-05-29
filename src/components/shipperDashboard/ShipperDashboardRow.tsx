import { Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { IShipperDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";

const ShipperDashboardRow = ({
  carrierName,
  carrierEmail,
  carrierPhone,
  carrierAddress,
  origin,
  destination,
  shipmentType,
  shipmentWeightVolume,
  pickupDateTime,
  deliveryDateTime,
  bidAmount,
}: IShipperDashboard) => {
  const invoiceId = Math.floor(1000 + Math.random() * 9000).toString();
  const renderCellContent = (content: string) => {
    return content ? content : "N/A";
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{invoiceId}</StyledTableCell>
      <StyledTableCell>{renderCellContent(carrierName)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(carrierEmail)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(carrierPhone)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(carrierAddress)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(origin)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(destination)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(shipmentType)}</StyledTableCell>
      <StyledTableCell>
        {renderCellContent(shipmentWeightVolume)}
      </StyledTableCell>
      <StyledTableCell>
        {renderCellContent(new Date(pickupDateTime).toLocaleDateString())}
      </StyledTableCell>
      <StyledTableCell>
        {renderCellContent(new Date(deliveryDateTime).toLocaleDateString())}
      </StyledTableCell>
      <StyledTableCell>{renderCellContent(bidAmount)}</StyledTableCell>
      <StyledTableCell onClick={(e) => e.stopPropagation()}>
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
