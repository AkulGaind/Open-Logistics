import PaymentIcon from "@mui/icons-material/Payment";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { IBidPortal, ICarrierDashboard } from "../../interfaces/interfaces";
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

const CarrierDashboardRow = ({
  shipperId,
  shipperName,
  shipperEmail,
  shipperPhone,
  shipperAddress,
  origin,
  destination,
  shipmentType,
  shipmentWeightVolume,
  pickupDateTime,
  deliveryDateTime,
  addDetails,
  bidAmount,
}: ICarrierDashboard) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [getInvoice] = useInvoiceMutation();
  const [getPaymentId] = usePaymentIdMutation();
  const { userId } = useSelector((state: RootState) => state.appState);
  const invoiceId = Math.floor(1000 + Math.random() * 9000).toString();
  const bidDetails: Omit<IBidPortal, "bidAmount"> &
    Pick<ICarrierDashboard, "shipperId"> = {
    shipperId,
    shipperName,
    shipperEmail,
    shipperPhone,
    shipperAddress,
    origin,
    destination,
    shipmentType,
    shipmentWeightVolume,
    pickupDateTime,
    deliveryDateTime,
    addDetails,
  };
  const handleRowClick = () => {
    navigate("/bidportal", { state: bidDetails });
  };

  const downloadInvoice = async () => {
    const { shipperId, addDetails, ...bidDetailsWithoutSpecs } = bidDetails;
    const invoiceDetails: Omit<IBidPortal, "addDetails"> & { carrierId: string } & { invoiceId: string } = {
      ...bidDetailsWithoutSpecs,
      bidAmount,
      invoiceId,
      carrierId: userId,
    };
    const pdf = await getInvoice(invoiceDetails).unwrap();
    const link = document.createElement("a");
    link.href = pdf;
    link.download = `${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paymentPortal = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const session = await getPaymentId({
      shipperName: shipperName,
      shipmentType: shipmentType,
      shipmentWeightVolume: shipmentWeightVolume,
      pickupDateTime: new Date(pickupDateTime),
      deliveryDateTime: new Date(deliveryDateTime),
      bidAmount: bidAmount,
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
      <StyledTableCell>{invoiceId}</StyledTableCell>
      <StyledTableCell>{renderCellContent(shipperName)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(shipperEmail)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(shipperPhone)}</StyledTableCell>
      <StyledTableCell>{renderCellContent(shipperAddress)}</StyledTableCell>
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
        <Tooltip title="Proceed to Payment">
          <IconButton
            size="small"
            onClick={paymentPortal}
            disabled={!bidAmount}
            sx={{ color: "#1976d2" }}
          >
            <PaymentIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download Invoice">
          <IconButton
            size="small"
            onClick={downloadInvoice}
            sx={{ color: "lightgreen" }}
            disabled={!bidAmount}
          >
            <Download fontSize="small" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CarrierDashboardRow;
