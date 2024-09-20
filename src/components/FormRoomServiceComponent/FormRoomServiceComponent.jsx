import React, { useContext, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { Plus, Minus, Trash } from "lucide-react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { ContextDashboard } from "../../page/DashBoardPage/DashBoardPage";
import { getAllServiceNoPanination } from "../../services/services";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderService,
  decreaseAmount,
  increaseAmount,
  removeOrderService,
  resetOrder,
} from "../../redux/Order/OrderSlide";
import { useMutationHook } from "../../hooks/useMutationHook";
import { addRoomService } from "../../services/dashboard";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";

const FormRoomServiceComponent = ({ handleClose, refetch }) => {
  const { booking } = useContext(ContextDashboard);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  let totalPrice = order?.orderItems?.reduce(
    (total, item) => total + item?.amount * item?.price,
    0
  );
  const { setToaster } = useContext(Context);

  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const getAllService = async (search) => {
    const res = await getAllServiceNoPanination(search);
    return res.data;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const { data: services } = useQueryHook(
    ["allservices", debouncedSearchTerm],
    () => getAllService(debouncedSearchTerm),
    { enabled: !!booking }
  );
  const handleAddService = (service) => {
    dispatch(
      addOrderService({
        orderItem: {
          name: service?.name,
          amount: 1,
          price: service?.price,
          service: service?.id,
        },
      })
    );
  };
  const hanldeChangeAmount = (type, idService) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idService }));
    } else {
      dispatch(decreaseAmount({ idService }));
    }
  };
  const handleRemoveService = (idService) => {
    dispatch(removeOrderService({ idService }));
  };
  const mutationAdd = useMutationHook((data) => addRoomService(data));
  const handleAddRoomService =async () => {
    try {
      for (let index = 0; index < order?.orderItems.length; index++) {
        const payload = {
          bookingId: booking?.bookingId,
          serviceId: order?.orderItems[index]?.service,
          quantity: order?.orderItems[index]?.amount,
        };
        console.log(payload)
        await mutationAdd.mutateAsync(payload);
      }
      dispatch(resetOrder())
      setToaster({
        type: "light",
        message: "Thêm dịch vụ thành công",
        show: true,
        icon: <BsCheck2Circle size={40} color="black" />,
      });

      refetch();
      handleClose()

    } catch (error) {
      console.error("Error adding room services:", error);
    }
  };

  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Room Services</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Control value={booking?.room?.number} type="text" disabled />
        </Form.Group>
        <SearchComponent
          value={search}
          onChange={handleSearchChange}
          placeholder={"Search services...."}
        />
        <div
          style={{
            border: "1px solid",
            padding: "10px 15px",
            margin: "10px 0",
            overflowY: "scroll",
            maxHeight: "200px",
            scrollbarWidth: "thin",
          }}
        >
          <div className="mb-2"></div>
          <ListGroup as="ol" numbered>
            {services?.map((service) => (
              <ListGroup.Item
                key={service?.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{service?.name}</div>
                  {service?.price}
                </div>
                <Button
                  onClick={() => handleAddService(service)}
                  variant="outline-dark"
                  size="sm"
                  className="mt-2"
                >
                  <Plus />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Current Orders</Form.Label>
          {order?.orderItems?.length > 0 ? (
            <div
              style={{
                border: "1px solid",
                padding: "10px 15px",
                margin: "5px 0",
                overflowY: "scroll",
                maxHeight: "150px",
                scrollbarWidth: "thin",
              }}
            >
              <ListGroup as="ol" numbered>
                {order?.orderItems?.map((items) => (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{items?.name}</div>
                      quantity: {items?.amount}{" "}
                      <Trash
                        size={20}
                        onClick={() => handleRemoveService(items?.service)}
                      />
                    </div>
                    <Button
                      onClick={() =>
                        hanldeChangeAmount("deincrease", items?.service)
                      }
                      variant="outline-dark"
                      size="sm"
                      className="mt-2"
                    >
                      <Minus size={15} />
                    </Button>
                    <input
                      type="text"
                      value={items?.amount}
                      disabled
                      style={{
                        width: "40px",
                        height: "30px",
                        textAlign: "center",
                        lineHeight: "20px",
                        border: "1px solid",
                      }}
                      className="mt-2"
                    />
                    <Button
                      style={{ borderRadius: "none" }}
                      onClick={() =>
                        hanldeChangeAmount("increase", items?.service)
                      }
                      variant="outline-dark"
                      size="sm"
                      className="mt-2"
                    >
                      <Plus size={15} />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Total : {totalPrice}$</Form.Label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleAddRoomService}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormRoomServiceComponent;
