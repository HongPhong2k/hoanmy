import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nameFull", headerName: "Họ và tên", width: 180 },
  { field: "namePhone", headerName: "Số điện thoại", width: 130 },
  {
    field: "prize",
    headerName: "Giải thưởng",
    width: 300,
  },
  {
    field: "submission_date",
    headerName: "Ngày",
    width: 160,
  },
];

function AdminPage() {
  const [valueData, setValueData] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let navigate = useNavigate();
  useEffect(() => {
    getCustomer();
    // ref.current.ownerDocument.body.scrollTop = 0;
  }, []);
  const getCustomer = () => {
    const storedValue = localStorage.getItem("TMVongQuayUser");
    if (!storedValue) {
      //navigate("/login");
    } else {
      const dataBody = {
        code: "1236950748",
      };
      // fetch("https://tmsoftware.vn/Woay/select.php", {
      //   method: "POST",
      //   body: JSON.stringify(dataBody),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.text())
      //   .then(console.log)
      //   .then((result) => {
      //     setValueData(result);
      //   })
      //   .catch((error) => {
      //     // Handle any error that occurred during the request
      //     console.error(error);
      //   });
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", padding: 15 }}>
        <div
          style={{
            flexGrow: 1,
            fontSize: "18px",
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Danh sách khách hàng
        </div>
        <div>
          <ReactHTMLTableToExcel
            id="test-table-xls-button-location"
            className="download-table-xls-button"
            table="table-to-xls-location"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Tải file"
          />
        </div>
      </div>
      <div style={{ height: "86vh", width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ height: "80vh" }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              id="table-to-xls-location"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      width: 50,
                      backgroundColor: "teal",
                      color: "white",
                      padding: "7px",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: 180,
                      backgroundColor: "teal",
                      color: "white",
                      padding: "7px",
                    }}
                  >
                    Họ và tên
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: 120,
                      backgroundColor: "teal",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: 250,
                      backgroundColor: "teal",
                      color: "white",
                      padding: "7px",
                    }}
                  >
                    Giải thưởng
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: 110,
                      backgroundColor: "teal",
                      color: "white",
                      padding: "7px",
                    }}
                  >
                    Ngày
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valueData === "" ? (
                  <div></div>
                ) : (
                  valueData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell key={row.id} style={{ padding: "8px" }}>
                            {row.id}
                          </TableCell>
                          <TableCell key={row.id} style={{ padding: "8px" }}>
                            {row.nameFull}
                          </TableCell>
                          <TableCell key={row.id} style={{ padding: "8px" }}>
                            {row.namePhone}
                          </TableCell>
                          <TableCell key={row.id} style={{ padding: "8px" }}>
                            {row.prize}
                          </TableCell>
                          <TableCell key={row.id} style={{ padding: "8px" }}>
                            {row.submission_date}
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={valueData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
export default AdminPage;
