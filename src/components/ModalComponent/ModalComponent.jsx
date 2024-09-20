import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ContextDashboard } from "../../page/DashBoardPage/DashBoardPage";
import FormCheckInGuestComponent from "../FormCheckInGuestComponent/FormCheckInGuestComponent";
import FormRoomServiceComponent from "../FormRoomServiceComponent/FormRoomServiceComponent";
import { ContextGuests } from "../../page/GuestPage/GuestPage";
import FormAddNewGuest from "../FormAddNewGuest/FormAddNewGuest";
import { ContextDetailGuests } from "../../page/DetailGuestPage/DetailGuestPage";
import { FormUpdateGuest } from "../FormUpdateGuest/FormUpdateGuest";
import { ContextRooms } from "../../page/RoomPage/RoomPage";
import FormAddNewRoom from "../FormAddNewRoom/FormAddNewRoom";
import { FormUpdateRoom } from "../FormUpdateRoom/FormUpdateRoom";
import { FormCreateService } from "../FormCreateService/FormCreateService";
import { ContextServices } from "../../page/ServicePage/ServicePage";
import { FormLogin } from "../FormLogin/FormLogin";
import { ContextBookings } from "../../page/BookingsPage/BookingsPage";
import FormAddBooking from "../FormAddBooking/FormAddBooking";
import { FormUpdateBooking } from "../FormUpdateBooking/FormUpdateBooking";
import FormCheckOutGuestComponent from "../FormCheckOutGuestComponent/FormCheckOutGuestComponent";
import FormUpdateService from "../FormUpdateService/FormUpdateService";

const ModalComponent = (props) => {
  const { show, handleClose, refetch } = props;
  const {
    isCheckinGuest,
    checkInGuest,
    isCheckoutGuest,
    checkOutGuest,
    isRoomService,

    roomServices,
  } = useContext(ContextDashboard);
  const { isGuests } = useContext(ContextGuests);
  const { isDetailGuest } = useContext(ContextDetailGuests);
  const { isRooms, isShowUpdate } = useContext(ContextRooms);
  const { isServices,isShowUpdateService } = useContext(ContextServices);
  const { isBookings, isShowUpdateBooking } = useContext(ContextBookings);
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
        {isRoomService === roomServices && isRoomService ? (
          <FormRoomServiceComponent
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : isGuests ? (
          <FormAddNewGuest refetch={refetch} handleClose={handleClose} />
        ) : isDetailGuest ? (
          <FormUpdateGuest refetch={refetch} handleClose={handleClose} />
        ) : isRooms && !isShowUpdate ? (
          <FormAddNewRoom refetch={refetch} handleClose={handleClose} />
        ) : isShowUpdate ? (
          <FormUpdateRoom refetch={refetch} handleClose={handleClose} />
        ) : isServices && !isShowUpdateService ? (
          <FormCreateService refetch={refetch} handleClose={handleClose} />
        ) : isShowUpdateService ?<FormUpdateService refetch={refetch} handleClose={handleClose}/>: isBookings && !isShowUpdateBooking ? (
          <FormAddBooking refetch={refetch} handleClose={handleClose} />
        ) : isShowUpdateBooking ? (
          <FormUpdateBooking refetch={refetch} handleClose={handleClose} />
        ) : isCheckinGuest === checkInGuest && isCheckinGuest ? (
          <FormCheckInGuestComponent
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : isCheckoutGuest === checkOutGuest && isCheckoutGuest ? (
          <FormCheckOutGuestComponent
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : (
          <FormLogin handleClose={handleClose} />
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
