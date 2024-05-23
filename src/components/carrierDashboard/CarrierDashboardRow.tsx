import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/bidportal");
  };

  return (
    <StyledTableRow onClick={handleRowClick}>
      <StyledTableCell>{s.carrierName}</StyledTableCell>
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
      <StyledTableCell onClick={(e) => e.stopPropagation()}>
        <IconButton
          size="small"
          // onClick={(event) => handleEdit(event)}
          sx={{ p: 0 }}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CarrierDashboardRow;
