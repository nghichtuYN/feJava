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
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import "./style.css";
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { deleteGuestAPI, getAllGuestsAPI } from "../../services/guests";
import { useQueryHook } from "../../hooks/useQueryHook";
import { Trash, SquarePen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { wait } from "../../ultis/wait";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import { useDebounce } from "@uidotdev/usehooks";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { useMutationHook } from "../../hooks/useMutationHook";

export const ContextGuests = createContext("unknow");
const GuestPage = () => {
  const [search, setSearch] = useState("");
  const isGuests = "Guests";
  const [typeGuest, setTypeGuests] = useState("All Guests");
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { setToaster } = useContext(Context);

  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const handleShow = () => setShow(true);
  const getAllGuests = async (page, search, filter) => {
    try {
      await wait(1500);
      const res = await getAllGuestsAPI(page, search, filter);
      return res.data;
    } catch (error) {}
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate(
      `/guests?page=1&search=${encodeURIComponent(
        e.target.value
      )}&filter=${encodeURIComponent(typeGuest)}`
    );
  };

  const handleFilterChange = (newFilter) => {
    setTypeGuests(newFilter);
    navigate(
      `/guests?page=1&search=${encodeURIComponent(
        search
      )}&filter=${encodeURIComponent(newFilter)}`
    );
  };
  const {
    data: guests,
    isFetching,
    refetch,
  } = useQueryHook(
    ["guest", page, navigate, debouncedSearchTerm, typeGuest],
    () => getAllGuests(page - 1, debouncedSearchTerm, typeGuest)
  );
  const value = useMemo(() => ({ isGuests }), [isGuests]);
  const handleMove = (id) => {
    navigate(`/guests/${id}`);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const onSuccess = () => {
    if (guests?.content?.length === 1) {
      if (page !== "1") {
        if (search !== "")
          navigate(
            `/guests/?page=${page - 1}&search=${encodeURIComponent(search)}`
          );
        else navigate(`/guests/?page=${page - 1}`);
      } else {
        if (search !== "")
          navigate(`/guests/?page=${1}&search=${encodeURIComponent(search)}`);
        else navigate(`/guests/?page=${1}`);
      }
    }
    refetch();
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
  const deleteSingle = () => {
    mutaionDelete.mutate({ id: currentPopoverId });
  };
  const popoverSingle = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Are you sure delete ?</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancelSingle}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="dark"
          onClick={() => {
            handleCancelSingle();
            deleteSingle();
          }}
        >
          Confirm
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <ContextGuests.Provider value={value}>
        <div
          className="guests"
          style={{
            backgroundColor: "#eee",
            padding: "15px 15px",
            height: "auto",
            minHeight: "120vh",
          }}
        >
          <Container fluid>
            <Row className="text-start ps-5 fw-bolder fs-4">{isGuests}</Row>
            <Row style={{ padding: "20px  60px 0 60px" }}>
              <Col md={2}>
                <Dropdown className="w-100">
                  <Dropdown.Toggle
                    className="w-100"
                    variant="outline-dark"
                    id="dropdown-basic"
                  >
                    {typeGuest}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleFilterChange("ALl Guests")}
                    >
                      All Guests
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterChange("Normal")}>
                      Normal
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
                  Add New Guest
                </Button>
              </Col>
            </Row>
            {isFetching ? (
              <SpinerComponent />
            ) : guests?.content?.length > 0 ? (
              <>
                <Row style={{ padding: "20px 55px" }}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>ID Card</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Class</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests?.content?.map((guest, index) => (
                        <tr key={index}>
                          <td>{guest?.id}</td>
                          <td>{guest?.idCard}</td>
                          <td>{guest?.name}</td>
                          <td>{guest?.gender}</td>
                          <td>{guest?.phone}</td>
                          <td>
                            {guest?.totalAmount > 1000 ? (
                              <Badge bg="dark">VIP</Badge>
                            ) : (
                              <Badge bg="light" text="dark">
                                Normal
                              </Badge>
                            )}
                          </td>
                          <td>
                            <SquarePen
                              onClick={() => handleMove(guest?.id)}
                              size={20}
                              className="me-3"
                            />
                            <OverlayTrigger
                              trigger="click"
                              placement={"top"}
                              overlay={popoverSingle}
                              show={currentPopoverId === guest?.id}
                              onToggle={() => handleTogglePopover(guest?.id)}
                              rootClose={true}
                            >
                              <Button
                                variant="dark"
                                size="sm"
                                onClick={() => handleTogglePopover(guest?.id)}
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
                    {`Showing ${guests?.pageable?.offset + 1} to ${
                      guests?.pageable?.offset + guests?.numberOfElements
                    } of ${guests?.totalElements} entries`}
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <PaninationComponent
                      numPage={guests?.totalPages}
                      pageCurrent={guests?.pageable?.pageNumber + 1}
                      search={search}
                    />
                  </Col>
                </Row>
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
      </ContextGuests.Provider>
    </>
  );
};

export default GuestPage;
