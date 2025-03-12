"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/apis/userApi";
import { setUserLoading, setUserError, setUsers } from "@/store/actions";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardHeader,
  TableHead,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import UpdateButton from "@/components/UpdateButton";
import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const users = useSelector((state: RootState) => state.user.users);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(setUserLoading(true));
      try {
        const data = await fetchUserData();
        localStorage.setItem("users", JSON.stringify(data));
        dispatch(setUsers(data));
        dispatch(setUserLoading(false));
      } catch (error: any) {
        dispatch(setUserError(error.message));
        dispatch(setUserLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  interface Column {
    id: "username" | "email";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "username", label: "username" },
    { id: "email", label: "email" },
  ];

  if (!user) return <div>Loading...</div>;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  return (
    <>
      <Card className="mb-4">
        <Typography variant="h2">User Profile</Typography>

        <Typography variant="subtitle1" gutterBottom>
          Name: {user.username}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Email: {user.email}
        </Typography>
        <LogoutButton />
      </Card>
      <Card>
        <CardHeader
          title="User List"
          subheader="List of Users"
          action={<UpdateButton />}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((row) => (
                  <TableRow key={row.username}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell style={{ width: 160 }}>{row.email}</TableCell>
                    <TableCell style={{ width: 160 }}>{row.email}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
                {userLoading && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3}>
                      <Typography variant="body1">
                        {" "}
                        Process Fetch Data{" "}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
