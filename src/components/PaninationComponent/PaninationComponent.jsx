import React, { useContext, useState } from "react";
import { Pagination } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  handleFirst,
  handleLast,
  handlePageNext,
  handlePagePrevious,
  renderPaginationItems,
} from "./handlePanination";
import { ContextGuests } from "../../page/GuestPage/GuestPage";
import { ContextRooms } from "../../page/RoomPage/RoomPage";
import { ContextServices } from "../../page/ServicePage/ServicePage";
export default function PaginationComponent(props) {
  const { numPage, pageCurrent, search } = props;
  const navigate = useNavigate();
  const pagesCurrent = Number(pageCurrent);
  const pageNumbers = Array.from({ length: numPage }, (_, index) => index);
  const { isGuests } = useContext(ContextGuests);
  const { isRooms } = useContext(ContextRooms);
  const { isServices } = useContext(ContextServices);

  return (
    <Pagination>
      <Pagination.First
        disabled={pagesCurrent === 1}
        onClick={() => handleFirst(navigate, search, isGuests, isRooms,isServices)}
      />
      <Pagination.Prev
        disabled={pagesCurrent === 1}
        tabIndex={-1}
        aria-disabled="true"
        onClick={() => {
          handlePagePrevious(pagesCurrent, navigate, search, isGuests, isRooms,isServices);
        }}
      />
      {renderPaginationItems(
        pageNumbers,
        pagesCurrent,
        numPage,
        navigate,
        search,
        isGuests,
        isRooms,
        isServices
      )}
      <Pagination.Next
        disabled={pagesCurrent === numPage}
        onClick={() => {
          handlePageNext(pagesCurrent, navigate, search, isGuests, isRooms,isServices);
        }}
      />
      <Pagination.Last
        disabled={pagesCurrent === numPage}
        onClick={() => {
          handleLast(navigate, numPage, search, isGuests, isRooms,isServices);
        }}
      />
    </Pagination>
  );
}
