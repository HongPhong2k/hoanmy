import { Form, Input, Button, message } from "antd";
import "./ChangePassword.scss";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { oldpass, newpass } = values;
    const dataBody = {
      code: "7268361002",
      passOld: oldpass,
      passNew: newpass,
    };

    fetch("https://tmsoftware.vn/Woay/API/update_user.php", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("check result pass: ", result);
        if (result && result === "eror_Old") {
          message.error("Mật khẩu cũ không chính xác");
        }
        if (result && result === "success") {
          message.success("Đổi mật khẩu thành công");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="content-p">
      <div className="form-content">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          {/* <Form.Item
            labelCol={{ span: 24 }}
            name="name"
            requiredMark={"optional"} // off star form
            rules={[
              {
                required: true,
                message: "Hãy nhập tên!",
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item> */}

          <Form.Item
            labelCol={{ span: 24 }}
            name="oldpass"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu cũ",
              },
            ]}
          >
            <Input.Password
              //visibilityToggle={false}
              placeholder="Mật khẩu cũ"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            name="newpass"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu mới",
              },
            ]}
          >
            <Input.Password
              //visibilityToggle={false}
              placeholder="Mật khẩu mới"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ChangePassword;
