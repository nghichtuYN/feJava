import React, { useContext, useState } from "react";
import { Context } from "../../layouts/DefaultLayout";
import { ContextServices } from "../../page/ServicePage/ServicePage";
import { BsCheck2Circle } from "react-icons/bs";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createServiceAPI } from "../../services/services";
import { Button, FloatingLabel, Form, InputGroup, Modal } from "react-bootstrap";

export const FormCreateService = ({ handleClose, refetch }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const { setToaster } = useContext(Context);
  const { typeServices } = useContext(ContextServices);
  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Tạo phòng thành công",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutationAdd = useMutationHook(
    (data) => createServiceAPI(data),
    onSuccess
  );

  const handleAddService = () => {
    mutationAdd.mutate({ name, category, price });
    // handleClose()
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
              Services name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <FloatingLabel
          className="mb-3"
            label={
              <>
                Category <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option defaultValue={0}>--Select category--</option>
              {typeServices?.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Form.Label>
            Price <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control
              min={0}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleAddService}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};
