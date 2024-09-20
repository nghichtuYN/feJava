import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import { deleteRoomAPI, getAllroomsAPI } from "../../services/rooms";
import { BsCheck2Circle } from "react-icons/bs";
import { useQueryHook } from "../../hooks/useQueryHook";
import { wait } from "../../ultis/wait";
import { Context } from "../../layouts/DefaultLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import { SquarePen, Trash } from "lucide-react";
export const ContextRooms = createContext("unknow");

const RoomPage = () => {
  const isRooms = "Rooms";
  const [typeRoom, setTypeRooms] = useState("All Rooms");
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [updateRoom, setUpdateRooms] = useState({});

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { setToaster } = useContext(Context);

  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const handleShow = () => setShow(true);
  const getAllRooms = async (page, search, filter) => {
    try {
      await wait(1500);
      const res = await getAllroomsAPI(page, search, filter);
      return res.data;
    } catch (error) {}
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate(
      `/rooms?page=1&search=${encodeURIComponent(
        e.target.value
      )}&filter=${encodeURIComponent(typeRoom)}`
    );
  };

  const handleFilterChange = (newFilter) => {
    setTypeRooms(newFilter);
    navigate(
      `/rooms?page=1&search=${encodeURIComponent(
        search
      )}&filter=${encodeURIComponent(newFilter)}`
    );
  };
  const {
    data: rooms,
    isFetching,
    refetch,
  } = useQueryHook(
    ["rooms", page, navigate, debouncedSearchTerm, typeRoom],
    () => getAllRooms(page - 1, debouncedSearchTerm, typeRoom)
  );
  const handleMove = (room) => {
    setIsShowUpdate(true);
    handleShow();
    setUpdateRooms(room);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const onSuccess = () => {
    if (rooms?.content?.length === 1) {
      if (page !== "1") {
        if (search !== "")
          navigate(
            `/rooms/?page=${page - 1}&search=${encodeURIComponent(search)}`
          );
        else navigate(`/rooms/?page=${page - 1}`);
      } else {
        if (search !== "")
          navigate(`/rooms/?page=${1}&search=${encodeURIComponent(search)}`);
        else navigate(`/rooms/?page=${1}`);
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
    return deleteRoomAPI(id);
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
    () => ({ isRooms, isShowUpdate,updateRoom,setIsShowUpdate,setUpdateRooms }),
    [isRooms,isShowUpdate,updateRoom ]
  );

  return (
    <ContextRooms.Provider value={value}>
      <div
        className="rooms"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "auto",
          minHeight: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isRooms}</Row>
          <Row style={{ padding: "20px  60px 0 60px" }}>
            <Col md={2}>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100"
                  variant="outline-dark"
                  id="dropdown-basic"
                >
                  {typeRoom}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleFilterChange("ALl Rooms")}
                  >
                    All Rooms
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange("STANDARD")}>
                    Standard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange("SUITE")}>
                    Suite
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange("VIP")}>
                    VIP
                  </Dropdown.Item>
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
                Add New Room
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: "20px 55px" }}>
            {isFetching ? (
              <SpinerComponent />
            ) : rooms?.content?.length > 0 ? (
              <>
                <Row style={{ padding: "20px 55px" }}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Room number</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms?.content?.map((room, index) => (
                        <tr key={index}>
                          <td>{room?.id}</td>
                          <td>{room?.number}</td>
                          <td>{room?.type}</td>
                          <td>$ {room?.price}</td>
                          <td>
                            {room?.status === "AVAILABLE" ? (
                              <Badge bg="dark">AVAILABLE</Badge>
                            ) : (
                              <Badge bg="light" text="dark">
                                UNAVAILABLE
                              </Badge>
                            )}
                          </td>
                          <td>
                            <SquarePen
                              onClick={() => handleMove(room)}
                              size={20}
                              className="me-3"
                            />
                            <OverlayTrigger
                              trigger="click"
                              placement={"top"}
                              overlay={popoverSingle}
                              show={currentPopoverId === room?.id}
                              onToggle={() => handleTogglePopover(room?.id)}
                              rootClose={true}
                            >
                              <Button
                                variant="dark"
                                size="sm"
                                onClick={() => handleTogglePopover(room?.id)}
                              >
                                <Trash size={20} />
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                <Row style={{ padding: "20px 55px" }}>
                  <Col className="d-flex justify-content-start align-items-center">
                    {`Showing ${rooms?.pageable?.offset + 1} to ${
                      rooms?.pageable?.offset + rooms?.numberOfElements
                    } of ${rooms?.totalElements} entries`}
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <PaninationComponent
                      numPage={rooms?.totalPages}
                      pageCurrent={rooms?.pageable?.pageNumber + 1}
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
    </ContextRooms.Provider>
  );
};

export default RoomPage;
