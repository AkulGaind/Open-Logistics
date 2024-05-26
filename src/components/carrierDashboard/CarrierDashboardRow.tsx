import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  const navigate = useNavigate();
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
    console.log(bidDetails)
    navigate("/bidportal", { state: bidDetails });
  };

  return (
    <StyledTableRow onClick={handleRowClick}>
      <StyledTableCell>{s.invoice}</StyledTableCell>
      <StyledTableCell>{s.shipperName}</StyledTableCell>
      <StyledTableCell>{s.shipperEmail}</StyledTableCell>
      <StyledTableCell>{s.shipperPhone}</StyledTableCell>
      <StyledTableCell>{s.shipperAddress}</StyledTableCell>
      <StyledTableCell>{s.origin}</StyledTableCell>
      <StyledTableCell>{s.destination}</StyledTableCell>
      <StyledTableCell>{s.shipmentType}</StyledTableCell>
      <StyledTableCell>{s.shipmentWeightVolume}</StyledTableCell>
      <StyledTableCell>
        {new Date(s.pickupDateTime).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell>
        {new Date(s.deliveryDateTime).toLocaleDateString()}
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

export default CarrierDashboardRow;
