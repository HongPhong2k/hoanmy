import "./Result.scss";
import FormUser from "../form/Form";

import bgketqua from "../../image/bg-ketqua.png";
import { MdOutlineCancel } from "react-icons/md";

const Result = (props) => {
  const {
    handleQuay,
    result,
    hanleOffModalButton,
    handleSetModalButton,
    setModalFinalResult,
  } = props;

  return (
    <div className="modal">
      <div className="blur"></div>
      <div className="content">
        <img src={bgketqua} alt="anh" className="anh-ketqua" />

        <div
          className="btn-cancel"
          onClick={() => {
            handleQuay(false);
            hanleOffModalButton();
            handleSetModalButton(false);
          }}
        >
          <MdOutlineCancel />
        </div>
        {result === "Bạn hết lượt quay !" ? (
          <div className="hetluot">
            <p>Bạn hết lượt quay !</p>
          </div>
        ) : (
          <>
            <div className="gift">
              <p className="gift__g">
                Chúc mừng bạn đã trúng phần quà: <span>{result}</span>
              </p>
            </div>
            <div className="text-info">
              <p className="text-info__t">
                Để lại thông tin nhận ngay quà xịn !
              </p>
            </div>
            <div className="info">
              <FormUser
                result={result}
                setModalFinalResult={setModalFinalResult}
                handleSetModalButton={handleSetModalButton}
                handleQuay={handleQuay}
              />
            </div>
          </>
          // <>
          //   <ModalCss
          //     handleQuay={handleQuay}
          //     hanleOffModalButton={hanleOffModalButton}
          //     handleSetModalButton={handleSetModalButton}
          //   />
          // </>
        )}
      </div>
    </div>
  );
};

export default Result;
