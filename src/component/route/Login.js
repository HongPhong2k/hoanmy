import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
function LoginPage() {
  const [valueUserName, setValueUserName] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [valueThongBao, setValueThongBao] = useState("");

  let navigate = useNavigate();
  const generateRandomString = (length) => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  const regUser = () => {
    setOpen(true);
    const randomString = generateRandomString(7);
    const dataBody = {
      user: valueUserName,
      password: valuePass,
    };

    fetch("https://tmsoftware.vn/Woay/User/index.php", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const token = result["token"];
        localStorage.setItem("TMVongQuayToken", token);
        localStorage.setItem("TMVongQuayUser", "4453019749");
        navigate("/admin");
      })
      .catch((error) => {
        setOpen(false);
        setValueThongBao("Tên đăng nhập hoặc mật khẩu không đúng");
        // Handle any error that occurred during the request
        console.error(error);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="content-register-page">
      <Card sx={{ minWidth: 375 }}>
        <CardHeader
          title="Thẩm Mỹ Quốc Tế Hoàn Mỹ"
          subheader="Đăng nhập tài khoản"
          style={{
            color: "blue",
            fontWeight: 900,
            textAlign: "center",
          }}
        />
        <CardContent style={{ textAlign: "start" }}>
          <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 5 }}>Tên đăng nhập *</div>
            <div>
              <TextField
                id="outlined-basic"
                placeholder="Tên đăng nhập"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(event) => {
                  setValueUserName(event.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 5 }}>Mật khẩu *</div>
            <div>
              <TextField
                id="outlined-basic"
                placeholder="Mật khẩu"
                variant="outlined"
                size="small"
                fullWidth
                type="password"
                onChange={(event) => {
                  setValuePass(event.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ height: 30, color: "red", textAlign: "center" }}>
            {valueThongBao}
          </div>
          <div style={{ display: "flex", margin: 10 }}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: "teal" }}
              onClick={regUser}
            >
              Đăng nhập
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Vui lòng đợi ..."}</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginPage;
