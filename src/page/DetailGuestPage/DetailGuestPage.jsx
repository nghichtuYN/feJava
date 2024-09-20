import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { wait } from "../../ultis/wait";
import { useQueryHook } from "../../hooks/useQueryHook";
import { deleteGuestAPI, getDetailGuestByIdAPI } from "../../services/guests";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import {  ChevronLeft } from "lucide-react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";

export const ContextDetailGuests = createContext("unknow");

const DetailGuestPage = () => {
  const { id } = useParams();
  const isDetailGuest = "Guests Detail";
  const [show, setShow] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const getDetailGuestByID = async (id) => {
    await wait(1500);
    const res = await getDetailGuestByIdAPI(id);
    return res.data;
  };

  const handleCancel = () => {
    setShowPopover(false);
  };

  const onSuccess = () => {
    navigate("/guests");
    setToaster({
      type: "light",
      message: "Xóa khách hàng thành công",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutaionDelete = useMutationHook((data) => {
    const { id } = data;
    return deleteGuestAPI(id);
  }, onSuccess);
  const handleDelete = () => {
    mutaionDelete.mutate({ id: guest?.id });
  };

  const popover = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Are you sure delete ?</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="dark"
          onClick={() => {
            handleDelete();
            handleCancel();
          }}
        >
          Confirm
        </Button>
      </Popover.Body>
    </Popover>
  );
  const {
    data: guest,
    isFetching,
    refetch,
  } = useQueryHook(["guest", id], () => getDetailGuestByID(Number(id)), {
    enabled: !!id,
  });
  const value = useMemo(
    () => ({ isDetailGuest, guest }),
    [isDetailGuest, guest]
  );
  console.log(guest);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return (
    <>
      {isFetching ? (
        <SpinerComponent />
      ) : (
        <ContextDetailGuests.Provider value={value}>
          <div
            className="guests"
            style={{
              backgroundColor: "#eee",
              padding: "15px 15px",
              height: "auto",
              minHeight:'100vh',
            }}
          >
            <Container fluid>
              <Row className="ps-5 fw-bolder fs-4">
                <Col className="d-flex justify-content-start align-items-center gap-1">
                  <ChevronLeft onClick={()=>navigate('/guests')} style={{cursor:'pointer'}} size={30} />
                  {isDetailGuest}
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-3 me-5 pe-5">
                  <Button variant="dark" onClick={handleShow}>
                    EDIT
                  </Button>
                  <OverlayTrigger
                    trigger="click"
                    placement={"bottom"}
                    overlay={popover}
                    show={showPopover}
                    onToggle={() => setShowPopover(!showPopover)}
                  >
                    <Button
                      className="del-btn"
                      variant="outline-dark"
                      size="md"
                      onClick={() => setShowPopover(!showPopover)}
                    >
                      DELETE
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
              <Row
                className="text-start fw-bolder"
                style={{ padding: "20px  60px 0 80px" }}
              >
                <Col>Name: {guest?.name}</Col>
                <Col>Gender: {guest?.gender}</Col>
                <Col>Phone: {guest?.phone}</Col>
              </Row>
              <Row
                className="text-start fw-bolder"
                style={{ padding: "20px  60px 0 80px" }}
              >
                <Col>ID Card: {guest?.idCard}</Col>
                <Col>Class: {guest?.totalAmount > 1000 ? "VIP" : "Normal"}</Col>
                <Col>Total amount: ${guest?.totalAmount}</Col>
              </Row>
              {isFetching ? (
                <SpinerComponent />
              ) : guest?.bookings?.length > 0 ? (
                <>
                  <Row style={{ padding: "20px 55px" }}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Room</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guest?.bookings?.map((booking, index) => {
                          const checkinDate = new Date(
                            booking?.checkIn
                          ).toLocaleString("en-US", options);
                          const checkoutDate = booking?.checkOut
                            ? new Date(booking?.checkOut).toLocaleString(
                                "en-US",
                                options
                              )
                            : "";
                          return (
                            <tr key={index}>
                              <td>{booking?.id}</td>
                              <td>{booking?.room?.number}</td>
                              <td>{checkinDate}</td> 
                              <td>{checkoutDate}</td>
                              <td>$ {booking?.amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Row>
                  {/* <Row style={{ padding: "20px 55px" }}>
                    <Col className="d-flex justify-content-start align-items-center">
                      {`Showing ${guest?.pageable?.offset + 1} to ${
                        guest?.pageable?.offset + guest?.numberOfElements
                      } of ${guest?.totalElements} entries`}
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <PaninationComponent
                        numPage={guest?.totalPages}
                        pageCurrent={guest?.pageable?.pageNumber + 1}
                        //   search={search}
                      />
                    </Col>
                  </Row> */}
                </>
              ) : (
                <NotFoundComponent />
              )}
            </Container>
          </div>
          <ModalComponent
            show={show}
            handleClose={handleClose}
            refetch={refetch}
          />
        </ContextDetailGuests.Provider>
      )}
    </>
  );
};

export default DetailGuestPage;
