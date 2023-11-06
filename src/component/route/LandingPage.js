import ButtonWheel from "../btn/ButtonWheel";
import Wheel from "../lucky wheel/Wheel";
import "./LandingPage.scss";
import React, { useEffect, useRef, useState } from "react";
import InfoResult from "../info result/InfoResult";
import Result from "../result/Result";
import banner from "../../image/banner.jpg";
import anh3 from "../../image/anh3.jpg";
import { Divider } from "antd";
const LandingPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [result, setResult] = useState("");
  const refModalButton = useRef();
  const [onModalButton, setOnModalButton] = useState(false);
  const [modalFinal, setModalFinal] = useState(false);

  const handleQuay = (check) => {
    setIsModal(check);
  };
  const handleSetModalButton = (b) => {
    setOnModalButton(b); // nhận biết khi modal được bật lên
  };

  const getResult = (r) => {
    setResult(r);
  };
  const hanleOffModalButton = () => {
    refModalButton.current.offModalButton(); // ẩn modal click button
  };
  const setModalFinalResult = (b) => {
    setModalFinal(b);
  };
  useEffect(() => {
    hanleOffModalButton();
  }, [isModal]);
  return (
    <>
      <div
        className="container"
        style={
          isModal || onModalButton
            ? { pointerEvents: "none", opacity: "0.5" }
            : {}
        }
      >
        <div className="parent">
          <img src={banner} alt="anh" className="anh_1" />
          <div>
            <Wheel handleQuay={handleQuay} getResult={getResult} />
          </div>
          <img src={anh3} alt="anh" className="anh_3" />
          <div
            style={{ textAlign: "center", fontFamily: "Roboto" }}
            className="by"
            onClick={() => window.open("https://tmsoftware.vn/", "_blank")}
          >
            Design Created by <b>tmsoftware.vn</b>
          </div>
          <Divider />
        </div>
      </div>

      <ButtonWheel
        handleQuay={handleQuay}
        handleSetModalButton={handleSetModalButton}
        getResult={getResult}
        ref={refModalButton}
        modalFinal={modalFinal}
      />
      {isModal && (
        <Result
          handleQuay={handleQuay}
          result={result}
          hanleOffModalButton={hanleOffModalButton} // off modal btn
          handleSetModalButton={handleSetModalButton} // blur screen
          setModalFinalResult={setModalFinalResult}
        />
      )}
      {modalFinal && (
        <InfoResult
          result={result}
          setModalFinalResult={setModalFinalResult}
          handleSetModalButton={handleSetModalButton}
        />
      )}
    </>
  );
};
export default LandingPage;
