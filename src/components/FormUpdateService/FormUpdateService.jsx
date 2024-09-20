import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateServiceAPI } from "../../services/services";
import { ContextServices } from "../../page/ServicePage/ServicePage";
import {
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";

const FormUpdateService = ({ handleClose, refetch }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const { typeServices } = useContext(ContextServices);
  const { setToaster } = useContext(Context);
  const { updateService, setIsShowUpdate, setUpdateServices } =
    useContext(ContextServices);
  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Update service successfull ! ",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };

  useEffect(() => {
    if (updateService) {
      setName(updateService.name);
      setCategory(updateService.category);
      setPrice(updateService.price);
    }
  }, [updateService]);
  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rest } = data;
    return updateServiceAPI(id, rest);
  }, onSuccess);
  const handleUpdateService = () => {
    mutationUpdate.mutate({
      id: updateService?.id,
      name,
      category,
      price: parseFloat(price),
    });
    handleClose();
    setIsShowUpdate(false);
    setUpdateServices({});
  };

  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Update Service</Modal.Title>
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
              value={name}
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
                <option
                  selected={updateService?.category === type}
                  key={index}
                  value={type}
                >
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleUpdateService}>
          SUBMIT
        </Button>
        <Button
          className="w-100"
          variant="outline-dark"
          onClick={() => {
            handleClose();
            setIsShowUpdate(false);
            setUpdateServices({});
          }}
        >
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormUpdateService;
