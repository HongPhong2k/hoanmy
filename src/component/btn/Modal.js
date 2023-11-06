import { useEffect, useRef, useState } from "react";
import anh2 from "../../image/anh2.jpg";
import vongquay from "../../image/VongQuay-HoanMy-02.png";
import "./Modal.scss";
import { MdOutlineCancel } from "react-icons/md";
import quayngay from "../../image/nutquay.png";
import muiten from "../../image/mui ten.png";
const Modal = (props) => {
  const { handleQuay, getResult, resetModalWheel, handleSetModalButton } =
    props;
  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [valueNoiDung, setValueNoiDung] = useState("");
  const wheelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThongBao, setIsThongBao] = useState(false);
  const refOutside = useRef(null);

  const values = [
    "Giảm 15% Bill",
    "Voucher 500.000đ",
    "Chăm Sóc Da Cao Cấp 8.000.000đ",
    "Voucher 1.000.000đ",
    "Khử Môi 1.500.000đ",
    "Voucher 2.000.000đ",
    "Xóa Mày 1.500.000đ",
    "Xóa nhăn 8.000.000đ",
  ];

  const spinWheel = () => {
    // Reset animation
    if (isSpinning) return;
    const cookieValue = localStorage.getItem("TMWheel");

    if (cookieValue === null) {
      setSpinning(true);

      const fullRots = Math.floor(Math.random() * 5) + 5;

      const targetAngle = 225 * fullRots; // Mỗi phần là 360 / 10 = 36 độ
      const initialRotation = Math.random() * 360;

      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${initialRotation}deg)`;

      setTimeout(() => {
        wheelRef.current.style.transition = "all ease-out 5s";
        wheelRef.current.style.transform = `rotate(${
          initialRotation + targetAngle
        }deg)`;

        const stopAngle = (initialRotation + targetAngle) % 360;
        const sliceSize = 360 / 8; // Bánh xe được chia thành 8 phần
        let stopIndex = Math.floor(stopAngle / sliceSize);

        if (stopIndex < 0) {
          stopIndex = 0;
        } else if (stopIndex > 7) {
          stopIndex = 7;
        }

        setTimeout(() => {
          setResult(values[stopIndex]);
          getResult(values[stopIndex]);
          setIsOpen(true);
          setSpinning(false);
          handleQuay(true);

          // localStorage.setItem("TMWheel", "OK");
        }, 6000);
      }, 0);
    } else {
      handleQuay(true);
      getResult("Bạn hết lượt quay !");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) => {
    if (
      refOutside &&
      refOutside.current &&
      !refOutside.current.contains(e.target)
    ) {
      resetModalWheel();
      handleSetModalButton(false);
    }
  };

  return (
    <>
      <div className="modal-quay" ref={refOutside}>
        {/* <img src={anh2} alt="anh" className="anh-modal" /> */}

        <div className="vongquay-btn">
          <img src={muiten} alt="anh" className="arrow-modal" />
          <img
            src={vongquay}
            alt="vong quay"
            ref={wheelRef}
            className="vongquay-modal"
          />

          <div className="btXoay" onClick={() => spinWheel()}>
            <img src={quayngay} alt="btn-quay" className="anh_btn-quay" />
          </div>
        </div>
        {/* <div
          className="btn-cancel"
          onClick={() => {
            resetModalWheel();
            handleSetModalButton(false);
          }}
        >
          <MdOutlineCancel />
        </div> */}
      </div>
    </>
  );
};

export default Modal;
