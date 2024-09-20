import React, { useContext, useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { getAllGuestsNoPaninationAPI } from "../../services/guests";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useState } from "react";
import { getRoomByTypeAndAvailable } from "../../services/rooms";
import { useMutationHook } from "../../hooks/useMutationHook";
import {  updateBookingAPI } from "../../services/bookings";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { ContextBookings } from "../../page/BookingsPage/BookingsPage";

export const FormUpdateBooking = ({ refetch, handleClose }) => {
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [checkIn, setCheckIn] = useState(null);
  const { setToaster } = useContext(Context);

  const [type, setType] = useState("");
  const typeRooms = ["STANDARD", "SUITE", "VIP"];
  const { updateBooking, setIsShowUpdate, setUpdateBooking } =
    useContext(ContextBookings);
  const getAllGuests = async () => {
    try {
      const res = await getAllGuestsNoPaninationAPI();
      return res.data;
    } catch (error) {}
  };
  const { data: guests } = useQueryHook(["guest"], getAllGuests);

  useEffect(() => {
    if (updateBooking) {
      setGuestId(updateBooking.guest?.id);
      setRoomId(updateBooking.room?.id);
      setCheckIn(updateBooking.checkIn);
      setType(updateBooking?.room?.type);
    }
  }, [updateBooking]);
  const getAllRoomAvaliableByType = async (type) => {
    try {
      const res = await getRoomByTypeAndAvailable(type);
      return res.data;
    } catch (error) {}
  };
  const { data: rooms } = useQueryHook(
    ["rooms", type],
    () => getAllRoomAvaliableByType(type),
    { enabled: !!type }
  );

  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Update booking successfull !",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutationUpdate = useMutationHook(
    (data) => {
      const { id, ...rest } = data;
      return updateBookingAPI(id,rest)},
    onSuccess
  );
  const handleAddBookings = () => {
    mutationUpdate.mutate({ id: updateBooking?.id, guestId, roomId });
    handleClose();
    setIsShowUpdate(false);
    setUpdateBooking({});
  };
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Update Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            className="mb-3"
            label={
              <>
                Guest <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setGuestId(e.target.value)}>
              <option defaultValue={0}>--Select guest--</option>
              {guests?.content?.map((guest) => (
                <option
                  selected={guestId === guest?.id}
                  key={guest?.id}
                  value={guest?.id}
                >
                  {guest?.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            label={
              <>
                Rooms Type <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option value={""}>--Select type room--</option>
              {typeRooms?.map((type, index) => (
                <option
                  selected={updateBooking?.room.type === type}
                  key={index}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {type ? (
            <FloatingLabel
              className="mb-3"
              label={
                <>
                  Rooms <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select onChange={(e) => setRoomId(e.target.value)}>
                <option defaultValue={0}>--Select type room--</option>
                {rooms?.map((room) => (
                  <option
                    selected={updateBooking?.room?.id === room?.id}
                    key={room?.id}
                    value={room?.id}
                  >
                    {room?.number}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          ) : null}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleAddBookings}>
          SUBMIT
        </Button>
        <Button
          className="w-100"
          variant="outline-dark"
          onClick={() => {
            handleClose();
            setIsShowUpdate(false);
            setUpdateBooking({});
          }}
        >
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};
