import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { Download } from "@mui/icons-material";

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/bidportal");
  };

  const renderCellContent = (content: string) => {
    return content ? content : "N/A";
  };

  return (
    <StyledTableRow onClick={handleRowClick}>
      <StyledTableCell>{renderCellContent(s.invoice)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.shipperName)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.shipperEmail)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.shipperPhone)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(s.shipperAddress)}</StyledTableCell>
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

export default CarrierDashboardRow;
