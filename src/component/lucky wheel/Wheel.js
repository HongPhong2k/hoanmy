import { useRef, useState } from "react";
import anh2 from "../../image/anh2.png";

import muiten from "../../image/mui ten.png";
import vongquay from "../../image/vongquay.png";
import quayngay from "../../image/NutVongQuay.png";
import "./Wheel.scss";
const Wheel = (props) => {
  const { handleQuay, getResult } = props;
  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const values = [
    "Tee Golf",
    "Voucher giảm 01 triệu lớp học Golf",
    "Nón Golf",
    "Voucher 1 game 18 lỗ",
    "Bóng Golf",
    "Voucher 1 giờ practice",
    "Voucher 100k",
    "Găng tay Golf",
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
        //const sliceSize = 360 / 8; // Bánh xe được chia thành 8 phần
        const sliceSize = 360 / 8;
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
        }, 6000);
      }, 0);
    } else {
      handleQuay(true);
      getResult("Bạn hết lượt quay !");
    }
  };

  return (
    <>
      <div className="vongquay-container">
        <img src={anh2} alt="anh" className="anh_2" />

        <div className="vongquay">
          <img src={muiten} alt="vong quay" className="arrow" />
          <img
            src={vongquay}
            alt="vong quay"
            ref={wheelRef}
            className="anh_vongquay"
          />
          <div className="btXoay" onClick={() => spinWheel()}>
            <img src={quayngay} alt="btn-quay" className="anh_btn-quay" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wheel;
