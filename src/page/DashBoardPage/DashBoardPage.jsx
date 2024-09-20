import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";

import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useSelector } from "react-redux";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import {
  checkOut,
  getOccupiedrooms,
  getStatsAPI,
} from "../../services/dashboard";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useDebounce } from "@uidotdev/usehooks";
import { wait } from "../../ultis/wait";
import { useLocation, useNavigate } from "react-router-dom";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import { useMutationHook } from "../../hooks/useMutationHook";

export const ContextDashboard = createContext("unknow");

const DashBoardPage = () => {
  const isDashboard = "Dashboard";
  const checkInGuest = "Check-in Guest";
  const checkOutGuest = "Check-out";
  const roomServices = "Room Services";
  const occupiedRooms = "Occupied Rooms";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const [isCheckinGuest, setIsCheckinGuest] = useState("");
  const [isCheckoutGuest, setIsCheckoutGuest] = useState("");
  const [isRoomService, setIsRoomService] = useState("");
  const [booking, setBooking] = useState({});
  const [currentPopoverId, setCurrentPopoverId] = useState(null);

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };
  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const mutationCheckOut = useMutationHook((data) => {
    const { id } = data;
    return checkOut(id);
  });

  const handleCheckoutGuest = () => {
    setIsCheckoutGuest(checkOutGuest);
    mutationCheckOut.mutate({ id: currentPopoverId });
    handleShow();
  };
  const {data :infoCheckout}=mutationCheckOut

  const popoverSingle = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Bạn có chắc chắn xóa ?</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancelSingle}>
          Hủy
        </Button>
        <Button
          size="sm"
          variant="dark"
          onClick={() => {
            handleCheckoutGuest();
            handleCancelSingle();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  useEffect(() => {
    if (!user?.name) {
      setShow(true);
    }
  }, [user]);

  const handleClose = () => {
    setIsCheckinGuest("");
    setIsCheckoutGuest("");
    setIsRoomService("");
    setShow(false);
  };

  const handleCheckinGuest = () => {
    setIsCheckinGuest(checkInGuest);
    handleShow();
  };

  const handleRoomService = (booking) => {
    setIsRoomService(roomServices);
    setBooking(booking);
    handleShow();
  };
  const getStats = async () => {
    const res = await getStatsAPI();
    return res.data;
  };
  const { data: stats } = useQueryHook(["stats"], getStats);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate(`/dashboard?page=1&search=${encodeURIComponent(e.target.value)}`);
  };

  const getOccupiedRooms = async (page, search) => {
    try {
      await wait(1500);
      const res = await getOccupiedrooms(page, search);
      return res.data;
    } catch (error) {}
  };
  const {
    data: occupiedRoomsList,
    refetch,
    isFetching,
  } = useQueryHook(["occupiedRooms", page, debouncedSearchTerm], () =>
    getOccupiedRooms(page - 1, debouncedSearchTerm)
  );
  const value = useMemo(
    () => ({
      isCheckinGuest,
      checkInGuest,
      isCheckoutGuest,
      checkOutGuest,
      isRoomService,
      roomServices,
      booking,
      isDashboard,
      infoCheckout,
    }),
    [isCheckinGuest, isCheckoutGuest, isRoomService, booking,infoCheckout]
  );
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
    <ContextDashboard.Provider value={value}>
      <div
        className="dashboard"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isDashboard}</Row>
          <Row
            style={{ padding: "20px  60px 0 60px" }}
            className="d-flex justify-content-center align-items-center gap-5"
          >
            <Col style={{ padding: 0 }}>
              <Card style={{ border: "1px solid" }}>
                <Card.Body className="d-flex flex-column align-items-start ps-5">
                  <Card.Title className="mb-2">Available rooms</Card.Title>
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      {stats?.availableRoom}/
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginLeft: "5px",
                        paddingTop: "6px",
                      }}
                    >
                      {stats?.totalRoom}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ padding: 0 }}>
              <Card style={{ border: "1px solid" }}>
                <Card.Body className="d-flex flex-column align-items-start ps-5">
                  <Card.Title className="mb-2">This month revenue</Card.Title>
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      $ {stats?.monthRevenue}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row
            style={{ padding: "20px  60px 0 60px" }}
            className="d-flex justify-content-between align-items-center"
          >
            <Card style={{ border: "1px solid" }}>
              <Card.Body className="text-start">
                <Card.Title className="fs-4">{occupiedRooms}</Card.Title>
              </Card.Body>
              <Row className="ps-3">
                <Col md={9}>
                  <SearchComponent
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={"Search..."}
                  />
                </Col>
                <Col md={3}>
                  <Button variant="dark" onClick={handleCheckinGuest}>
                    {checkInGuest}
                  </Button>
                </Col>
              </Row>
              <Row className="ps-3">
                {isFetching ? (
                  <SpinerComponent />
                ) : occupiedRoomsList?.content?.length > 0 ? (
                  <>
                    <Row style={{ padding: "20px 55px" }}>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Room</th>
                            <th>Guest</th>
                            <th>Check-in</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {occupiedRoomsList?.content?.map((book, index) => {
                            const checkinDate = new Date(
                              book?.checkIn
                            ).toLocaleString("en-US", options);

                            return (
                              <tr key={index}>
                                <td>{book?.room?.number}</td>
                                <td>{book?.guest?.name}</td>
                                <td>{checkinDate}</td>
                                <td>
                                  <OverlayTrigger
                                    trigger="click"
                                    placement={"top"}
                                    overlay={popoverSingle}
                                    show={currentPopoverId === book?.bookingId}
                                    onToggle={() =>
                                      handleTogglePopover(book?.bookingId)
                                    }
                                    rootClose={true}
                                  >
                                    <Button
                                      variant="outline-dark"
                                      onClick={() =>
                                        handleTogglePopover(book?.bookingId)
                                      }
                                    >
                                      {checkOutGuest}
                                    </Button>
                                  </OverlayTrigger>

                                  <Button
                                    className="ms-2"
                                    variant="outline-dark"
                                    onClick={() => handleRoomService(book)}
                                  >
                                    {roomServices}
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Row>
                    <Row style={{ padding: "20px 55px" }}>
                      <Col className="d-flex justify-content-start align-items-center">
                        {`Showing ${
                          occupiedRoomsList?.pageable?.offset + 1
                        } to ${
                          occupiedRoomsList?.pageable?.offset +
                          occupiedRoomsList?.numberOfElements
                        } of ${occupiedRoomsList?.totalElements} entries`}
                      </Col>
                      <Col className="d-flex justify-content-end align-items-center">
                        <PaninationComponent
                          numPage={occupiedRoomsList?.totalPages}
                          pageCurrent={
                            occupiedRoomsList?.pageable?.pageNumber + 1
                          }
                          search={search}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <NotFoundComponent />
                )}
              </Row>
            </Card>
          </Row>
        </Container>
        <ModalComponent
          show={show}
          handleClose={handleClose}
          refetch={refetch}
        />
      </div>
    </ContextDashboard.Provider>
  );
};

export default DashBoardPage;
