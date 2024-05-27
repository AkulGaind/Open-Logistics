import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarrierDashboardRow from "../components/carrierDashboard/CarrierDashboardRow";
import PageLoader from "../components/common/PageLoader";
import { ScrollbarStyles } from "../components/common/styled";
import {
  ICarrierDashboard,
  ICarrierDashboardColumn,
} from "../interfaces/interfaces";
import { setLoading } from "../redux/slices/appStateSlice";
import { useLazyShipperDetailsQuery } from "../redux/slices/serviceSlice";
import { RootState } from "../redux/store/store";
import myColors from "../themes/colors";
import { carrier_columns } from "../utility/constants";

const CarrierDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchShipperDetails] = useLazyShipperDetailsQuery();
  const { userId, loading } = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState<ICarrierDashboard[]>([]);

  useEffect(() => {
    const getShipperDetails = async () => {
      try {
        const { data } = await fetchShipperDetails(userId).unwrap();
        dispatch(setLoading(true));
        setRowData(data!);
      } catch (error) {
        console.log("Failed to fetch shipper details:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getShipperDetails();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredRows = rowData.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Box padding={8}>
          <Typography
            sx={{
              color: myColors.textBlack,
              maxWidth: "580px",
            }}
            variant="h2"
            fontSize={"45px"}
            fontWeight={600}
            paddingBottom={10}
          >
            Carrier Dashboard
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "auto" }}
            />
          </Box>
          <TableContainer
            sx={{
              border: "1px solid",
              borderColor: myColors.backgroundGreyV2,
              ...ScrollbarStyles,
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: myColors.yellow.main }}>
                <TableRow>
                  {carrier_columns.map((column: ICarrierDashboardColumn) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CarrierDashboardRow key={row._id} {...row} />
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default CarrierDashboard;
