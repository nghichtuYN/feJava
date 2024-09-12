import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ContextDashboard } from "../../page/DashBoardPage/DashBoardPage";
import FormCheckInGuestComponent from "../FormCheckInGuestComponent/FormCheckInGuestComponent";
import FormRoomServiceComponent from "../FormRoomServiceComponent/FormRoomServiceComponent";

const ModalComponent = (props) => {
  const { show, handleClose } = props;
  const {
    isCheckinGuest,
    checkInGuest,
    isCheckoutGuest,
    checkOutGuest,
    isRoomService,
    roomServices,
  } = useContext(ContextDashboard);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {isCheckinGuest === checkInGuest && isCheckinGuest ? (
          <FormCheckInGuestComponent handleClose={handleClose} />
        ) : null}
        {isRoomService === roomServices && isRoomService ? (
          <FormRoomServiceComponent handleClose={handleClose}/>
        ) : null}
      </Modal>
    </>
  );
};

export default ModalComponent;
