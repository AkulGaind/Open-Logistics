import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const Dashboard = () => {
    const { appRole } = useSelector((state: RootState) => state.appState);
    return (
        <Typography variant="h1">
            You are {appRole}
        </Typography>
    )
}

export default Dashboard;