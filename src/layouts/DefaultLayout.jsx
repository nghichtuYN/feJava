import React, { createContext, useMemo, useState } from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import { Col, Container } from "react-bootstrap";
import SideBarComponent from "../components/SideBarComponent/SideBarComponent";
import "./style.css";
export const Context = createContext("unknown");

export const DefaultLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [toaster, setToaster] = useState({
    show: false,
    message: "",
    type: "",
    icon: null,
  });
  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <Context.Provider value={value}>
      <div className="AdminLayout d-flex flex-column">
        <HeaderComponent className="fixed-navbar" />
        <Container
          fluid
          className="container-admin d-flex flex-row"
          style={{ padding: 0 }}
        >
          <Col
            md={toggle ? 1 : 2}
            lg={toggle ? 1 : 2}
            xl={toggle ? 1 : 2}
            xxl={toggle ? 1 : 2}
            style={{ overflow: "hidden" }}
            className="fixed-sidebar"
          >
            <SideBarComponent toggle={toggle} Toggle={Toggle} />
          </Col>
          <Col className={`content-area ${toggle ? "pe-5" : ""}`}>
            {children}
          </Col>
        </Container>
      </div>
    </Context.Provider>
  );
};
