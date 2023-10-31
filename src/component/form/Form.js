import { message } from "antd";
import "./form.scss";
import { useRef, useState } from "react";
const FormUser = (props) => {
  const { setModalFinalResult, handleSetModalButton, handleQuay, result } =
    props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const refName = useRef(null);
  const refPhone = useRef(null);

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  };
  const callAPI = () => {
    const dataBody = {
      code: "1236950748",
      name: name,
      phone: phone,
      prize: result,
      ngay: "",
    };

    fetch("https://tmsoftware.vn/Woay/add.php", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then(console.log)
      .then((result) => {
        console.log("data", dataBody);
        console.log("check result api: ", result);

        if (result && result["message"] === "already") {
          message.error("Số điện thoại đã được dùng");
        } else if (result && result["message"] === "success") {
          localStorage.setItem("TMWheel", "OK");
          setModalFinalResult(true);
          handleSetModalButton(true);
          handleQuay(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const checkForm = () => {
    if (!name) {
      refName.current.focus();
      refName.current.style.border = "2px solid red";
    } else {
      refName.current.style.border = "none";
    }
    if (!phone) {
      refPhone.current.focus();
      refPhone.current.style.border = "2px solid red";
      return;
    } else {
      refPhone.current.style.border = "none";
    }
    if (phone.length < 10 || phone.match(/^[0-9]+$/) == null) {
      message.error("Số điện thoại không đúng");
      return;
    }

    if (name && phone) {
      //callAPI();
      setModalFinalResult(true);
      handleSetModalButton(true);
      handleQuay(false);
    }
  };

  return (
    <div className="form">
      <input
        placeholder="Họ và tên"
        className="field"
        ref={refName}
        onChange={(e) => {
          handleSetName(e);
        }}
        // style={{ border: "1px solid red" }}
      ></input>

      <input
        placeholder="Số điện thoại"
        className="field"
        ref={refPhone}
        onChange={(e) => {
          handleSetPhone(e);
        }}
      ></input>
      <div className="btn-ok" onClick={checkForm}>
        Xác Nhận
      </div>
    </div>
  );
};

export default FormUser;
