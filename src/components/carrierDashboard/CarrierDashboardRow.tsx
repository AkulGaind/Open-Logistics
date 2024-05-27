import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ICarrierDashboard } from "../../interfaces/interfaces";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { Download } from "@mui/icons-material";
import {
  useInvoiceMutation,
  usePaymentIdMutation,
} from "../../redux/slices/serviceSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getJwtValue } from "../../utility/utils";

const CarrierDashboardRow = (s: ICarrierDashboard) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [getInvoice] = useInvoiceMutation();
  const [getPaymentId] = usePaymentIdMutation();
  const { userId } = useSelector((state: RootState) => state.appState);
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
    const data = await getInvoice("").unwrap();
    console.log(data);
  };

  const paymentPortal = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const session = await getPaymentId({
      shipperName: s.shipperName,
      shipmentType: s.shipmentType,
      shipmentWeightVolume: s.shipmentWeightVolume,
      pickupDateTime: new Date(s.pickupDateTime),
      deliveryDateTime: new Date(s.deliveryDateTime),
      bidAmount: s.bidAmount,
    }).unwrap();
    const result = stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    });
    localStorage.setItem("jwt", getJwtValue()!);
    localStorage.setItem("userId", userId);
    if ((await result!).error) {
      console.log("Error in stripe: ", (await result!).error);
    }
  };

  const renderCellContent = (content: string) => {
    return content ? content : "N/A";
  };

  const isCarrierDashboard = location.pathname === "/carrierdash";

  return (
    <StyledTableRow onClick={isCarrierDashboard ? handleRowClick : undefined}>
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
        <IconButton
          size="small"
          onClick={paymentPortal}
          disabled={s.bidAmount ? false : true}
        >
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
