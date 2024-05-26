import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { Download } from "@mui/icons-material";
import { useInvoiceMutation } from "../../redux/slices/serviceSlice";

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  const navigate = useNavigate();
  const [getInvoice] = useInvoiceMutation();
  const handleRowClick = () => {
    const bidDetails = {
      shipperId: s.shipperId,
      shipperName: s.shipperName,
      shipperEmail: s.shipperEmail,
      shipperPhone: s.shipperPhone,
      shipperAddress: s.shipperAddress,
      origin: s.origin,
      destination: s.destination,
      shipmentType: s.shipmentType,
      shipmentWeightVolume: s.shipmentWeightVolume,
      pickupDateTime: s.pickupDateTime,
      deliveryDateTime: s.deliveryDateTime,
      addDetails: s.addDetails,
    };
    navigate("/bidportal", { state: bidDetails });
  };

  const downloadInvoice = async () => {
    const data = getInvoice("");
    console.log(data);
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
        <IconButton size="small" onClick={downloadInvoice}>
          <Download fontSize="small" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CarrierDashboardRow;
