import React, { createContext, useContext, useMemo, useState } from "react";
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";
import {
  Button,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { Context } from "../../layouts/DefaultLayout";
import { wait } from "../../ultis/wait";
import { deleteBookingAPI, getAllBookingsAPI } from "../../services/bookings";
import { useQueryHook } from "../../hooks/useQueryHook";
import { BsCheck2Circle } from "react-icons/bs";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import { SquarePen, Trash } from "lucide-react";
import { useMutationHook } from "../../hooks/useMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
export const ContextBookings = createContext("unknow");

const BookingsPage = () => {
  const isBookings = "Bookings";
  const [typeBooking, setTypeBooking] = useState("All Bookings");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const typeBookings = [
    { name: "Pre-booking", value: "is_pre_booking" },
    { name: "Check-out", value: "checked_out" },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const [isShowUpdateBooking, setIsShowUpdate] = useState(false);
  const [updateBooking, setUpdateBooking] = useState({});
  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const getAllBookings = async (page, search, filter) => {
    try {
      await wait(1500);
      const res = await getAllBookingsAPI(page, search, filter);
      return res.data;
    } catch (error) {}
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate(
      `/bookings?page=1&search=${encodeURIComponent(
        e.target.value
      )}&filter=${encodeURIComponent(typeBooking)}`
    );
  };
  const handleFilterChange = (newFilter) => {
    setTypeBooking(newFilter);
    navigate(
      `/bookings?page=1&search=${encodeURIComponent(
        search
      )}&filter=${encodeURIComponent(newFilter)}`
    );
  };

  const {
    data: bookings,
    isFetching,
    refetch,
  } = useQueryHook(
    ["bookings", page, navigate, debouncedSearchTerm, typeBooking],
    () => getAllBookings(page - 1, debouncedSearchTerm, typeBooking)
  );

  const handleMove = (booking) => {
    setIsShowUpdate(true);
    handleShow();
    setUpdateBooking(booking);
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const onSuccess = () => {
    if (bookings?.content?.length === 1) {
      if (page !== "1") {
        if (search !== "")
          navigate(
            `/services/?page=${page - 1}&search=${encodeURIComponent(search)}`
          );
        else navigate(`/services/?page=${page - 1}`);
      } else {
        if (search !== "")
          navigate(`/services/?page=${1}&search=${encodeURIComponent(search)}`);
        else navigate(`/services/?page=${1}`);
      }
    }
    refetch();
    setToaster({
      type: "light",
      message: "Xóa phòng thành công",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutaionDelete = useMutationHook((data) => {
    const { id } = data;
    return deleteBookingAPI(id);
  }, onSuccess);
  const deleteSingle = () => {
    mutaionDelete.mutate({ id: currentPopoverId });
  };
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
            handleCancelSingle();
            deleteSingle();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const value = useMemo(
    () => ({ isBookings, typeBookings, isShowUpdateBooking }),
    [isBookings, typeBookings, isShowUpdateBooking]
  );
  return (
    <ContextBookings.Provider value={value}>
      <div
        className="guests"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isBookings}</Row>
          <Row style={{ padding: "20px  60px 0 60px" }}>
            <Col md={2}>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100"
                  variant="outline-dark"
                  id="dropdown-basic"
                >
                  {typeBooking}{" "}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleFilterChange("All Bookings")}
                  >
                    All Bookings
                  </Dropdown.Item>
                  {typeBookings?.map((type, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleFilterChange(type.value)}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={8}>
              <SearchComponent
                value={search}
                onChange={handleSearchChange}
                placeholder={"Search..."}
              />
            </Col>
            <Col md={2}>
              <Button variant="dark" onClick={handleShow}>
                Add Pre-Booking
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: "20px 55px" }}>
            {isFetching ? (
              <SpinerComponent />
            ) : bookings?.content?.length > 0 ? (
              <>
                <Row style={{ padding: "20px 55px" }}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.content?.map((booking, index) => {
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
                            <td>{booking?.guest?.name}</td>
                            <td>{booking?.room?.number}</td>
                            <td>{checkinDate}</td> <td>{checkoutDate}</td>
                            <td>
                              <SquarePen
                                size={20}
                                onClick={() => handleMove(booking)}
                                className="me-3"
                              />
                              <OverlayTrigger
                                trigger="click"
                                placement={"top"}
                                overlay={popoverSingle}
                                show={currentPopoverId === booking?.id}
                                onToggle={() =>
                                  handleTogglePopover(booking?.id)
                                }
                                rootClose={true}
                              >
                                <Button
                                  variant="dark"
                                  size="sm"
                                  onClick={() =>
                                    handleTogglePopover(booking?.id)
                                  }
                                >
                                  <Trash size={20} />
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>
                <Row style={{ padding: "20px 55px" }}>
                  <Col className="d-flex justify-content-start align-items-center">
                    {`Showing ${bookings?.pageable?.offset + 1} to ${
                      bookings?.pageable?.offset + bookings?.numberOfElements
                    } of ${bookings?.totalElements} entries`}
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <PaninationComponent
                      numPage={bookings?.totalPages}
                      pageCurrent={bookings?.pageable?.pageNumber + 1}
                      search={search}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <NotFoundComponent />
            )}
          </Row>
        </Container>
        <ModalComponent
          show={show}
          handleClose={handleClose}
          refetch={refetch}
        />
      </div>
    </ContextBookings.Provider>
  );
};

export default BookingsPage;
