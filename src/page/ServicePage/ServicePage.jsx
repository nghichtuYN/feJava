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
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { deleteServiceAPI, getAllServicesAPI } from "../../services/services";
import { wait } from "../../ultis/wait";
import { Context } from "../../layouts/DefaultLayout";
import { useQueryHook } from "../../hooks/useQueryHook";
import { BsCheck2Circle } from "react-icons/bs";
import { useMutationHook } from "../../hooks/useMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
import { SquarePen, Trash } from "lucide-react";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
export const ContextServices = createContext("unknow");

const ServicePage = () => {
  const isServices = "Services";
  const [typeService, setTypeService] = useState("All Services");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const typeServices = [
    "FOOD_AND_BEVERAGE",
    "HOUSEKEEPING",
    "SPA_AND_WELLNESS",
    "OTHER",
  ];
  const [search, setSearch] = useState("");
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [isShowUpdateService, setIsShowUpdate] = useState(false);
  const [updateService, setUpdateServices] = useState({});
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { setToaster } = useContext(Context);

  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const handleShow = () => setShow(true);
  const getAllServices = async (page, search, filter) => {
    try {
      await wait(1500);
      const res = await getAllServicesAPI(page, search, filter);
      return res.data;
    } catch (error) {}
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate(
      `/services?page=1&search=${encodeURIComponent(
        e.target.value
      )}&filter=${encodeURIComponent(typeService)}`
    );
  };

  const handleFilterChange = (newFilter) => {
    setTypeService(newFilter);
    navigate(
      `/services?page=1&search=${encodeURIComponent(
        search
      )}&filter=${encodeURIComponent(newFilter)}`
    );
  };
  const {
    data: services,
    isFetching,
    refetch,
  } = useQueryHook(
    ["services", page, navigate, debouncedSearchTerm, typeService],
    () => getAllServices(page - 1, debouncedSearchTerm, typeService)
  );

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const onSuccess = () => {
    if (services?.content?.length === 1) {
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
    return deleteServiceAPI(id);
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

  const handleMove = (service) => {
    setIsShowUpdate(true);
    handleShow();
    setUpdateServices(service);
  };

  const value = useMemo(
    () => ({
      isServices,
      typeServices,
      isShowUpdateService,
      updateService,setIsShowUpdate,setUpdateServices
    }),
    [isServices, typeServices,updateService,isShowUpdateService]
  );
  return (
    <ContextServices.Provider value={value}>
      <div
        className="guests"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isServices}</Row>
          <Row style={{ padding: "20px  60px 0 60px" }}>
            <Col md={2}>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100"
                  variant="outline-dark"
                  id="dropdown-basic"
                >
                  {typeService}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleFilterChange("ALl Services")}
                  >
                    All Services
                  </Dropdown.Item>
                  {typeServices?.map((category, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleFilterChange(category)}
                    >
                      {category}
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
                Add New Service
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: "20px 55px" }}>
            {isFetching ? (
              <SpinerComponent />
            ) : services?.content?.length > 0 ? (
              <>
                <Row style={{ padding: "20px 55px" }}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services?.content?.map((service, index) => (
                        <tr key={index}>
                          <td>{service?.id}</td>
                          <td>{service?.name}</td>
                          <td>{service?.category}</td>
                          <td>$ {service?.price}</td>
                          <td>
                            {service?.status === "AVAILABLE" ? (
                              <Badge bg="dark">AVAILABLE</Badge>
                            ) : (
                              <Badge bg="light" text="dark">
                                UNAVAILABLE
                              </Badge>
                            )}
                          </td>
                          <td>
                            <SquarePen
                              onClick={() => handleMove(service)}
                              size={20}
                              className="me-3"
                            />
                            <OverlayTrigger
                              trigger="click"
                              placement={"top"}
                              overlay={popoverSingle}
                              show={currentPopoverId === service?.id}
                              onToggle={() => handleTogglePopover(service?.id)}
                              rootClose={true}
                            >
                              <Button
                                variant="dark"
                                size="sm"
                                onClick={() => handleTogglePopover(service?.id)}
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
                    {`Showing ${services?.pageable?.offset + 1} to ${
                      services?.pageable?.offset + services?.numberOfElements
                    } of ${services?.totalElements} entries`}
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <PaninationComponent
                      numPage={services?.totalPages}
                      pageCurrent={services?.pageable?.pageNumber + 1}
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
    </ContextServices.Provider>
  );
};

export default ServicePage;
