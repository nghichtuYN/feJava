import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateGuestAPI } from "../../services/guests";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { ContextDetailGuests } from "../../page/DetailGuestPage/DetailGuestPage";
export const FormUpdateGuest = ({ handleClose, refetch }) => {
  const [name, setName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const { setToaster } = useContext(Context);
  const { guest } = useContext(ContextDetailGuests);

  useEffect(() => {
    setName(guest?.name);
    setIdCard(guest?.idCard);
    setPhone(guest?.phone);
    setGender(guest?.gender);
  }, [guest]);
  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Cập nhật khách hàng thành công",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rest } = data;
    return updateGuestAPI(id, rest);
  }, onSuccess);
  const handleUpdateGuest = () => {
    mutationUpdate.mutate({ id: guest?.id, name, idCard, phone, gender });
    handleClose();
  };
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">New Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              ID Card <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setIdCard(e.target.value)}
              type="text"
              value={idCard}
              placeholder="Enter id card"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Phone <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              value={phone}
              placeholder="Enter phone"
            />
          </Form.Group>
          <Form.Label className="me-2">
            Gender <span className="text-danger">*</span>
          </Form.Label>
          <Form.Check
            inline
            label="Male"
            name="group1"
            type="radio"
            value={"MALE"}
            checked={gender==="MALE"}
            id={`inline-radio-1`}
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            value={"FEMALE"}
            checked={gender==="FEMALE"}
            id={`inline-radio-2`}
            onChange={(e) => setGender(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleUpdateGuest}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};
