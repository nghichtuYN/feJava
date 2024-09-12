import React from "react";
import { Pagination } from "react-bootstrap";
import "./style.css"
const PaninationComponent = () => {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>

      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default PaninationComponent;
