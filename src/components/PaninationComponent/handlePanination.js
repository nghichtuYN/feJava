import { Pagination } from "react-bootstrap";

export const handleFirst = (
  navigate,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  if (isGuests) {
    if (search !== "")
      navigate(`/guests/?page=${1}&search=${encodeURIComponent(search)}`);
    else navigate(`/guests/?page=${1}`);
  }
  if (isRooms) {
    if (search !== "")
      navigate(`/rooms/?page=${1}&search=${encodeURIComponent(search)}`);
    else navigate(`/rooms/?page=${1}`);
  }
  if (isServices) {
    if (search !== "")
      navigate(`/services/?page=${1}&search=${encodeURIComponent(search)}`);
    else navigate(`/services/?page=${1}`);
  }
  if (isDashboard) {
    if (search !== "")
      navigate(`/dashboards/?page=${1}&search=${encodeURIComponent(search)}`);
    else navigate(`/dashboards/?page=${1}`);
  }
};
export const handleLast = (
  navigate,
  numPage,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  if (isGuests) {
    if (search !== "")
      navigate(`/guests/?page=${numPage}&search=${encodeURIComponent(search)}`);
    else navigate(`/guests/?page=${numPage}`);
  }
  if (isRooms) {
    if (search !== "")
      navigate(`/rooms/?page=${numPage}&search=${encodeURIComponent(search)}`);
    else navigate(`/rooms/?page=${numPage}`);
  }
  if (isServices) {
    if (search !== "")
      navigate(
        `/services/?page=${numPage}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/services/?page=${numPage}`);
  }
  if (isDashboard) {
    if (search !== "")
      navigate(
        `/dashboards/?page=${numPage}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/dashboards/?page=${numPage}`);
  }
};
export const handlePageChange = (
  pageIndex,
  navigate,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  if (isGuests) {
    if (search !== "")
      navigate(
        `/guests/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/guests/?page=${pageIndex}`);
  }
  if (isRooms) {
    if (search !== "")
      navigate(
        `/rooms/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/rooms/?page=${pageIndex}`);
  }
  if (isServices) {
    if (search !== "")
      navigate(
        `/services/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/services/?page=${pageIndex}`);
  }
  if (isDashboard) {
    if (search !== "")
      navigate(
        `/dashboards/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/dashboards/?page=${pageIndex}`);
  }
};
export const handlePagePrevious = (
  pagesCurrent,
  navigate,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  if (isGuests) {
    if (search !== "")
      navigate(
        `/guests/?page=${pagesCurrent - 1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/guests/?page=${pagesCurrent - 1}`);
  }
  if (isRooms) {
    if (search !== "")
      navigate(
        `/rooms/?page=${pagesCurrent - 1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/rooms/?page=${pagesCurrent - 1}`);
  }
  if (isServices) {
    if (search !== "")
      navigate(
        `/services/?page=${pagesCurrent - 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/services/?page=${pagesCurrent - 1}`);
  }
  if (isDashboard) {
    if (search !== "")
      navigate(
        `/dashboards/?page=${pagesCurrent - 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/dashboards/?page=${pagesCurrent - 1}`);
  }
};
export const handlePageNext = (
  pagesCurrent,
  navigate,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  if (isGuests) {
    if (search !== "")
      navigate(
        `/guests/?page=${pagesCurrent + 1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/guests/?page=${pagesCurrent + 1}`);
  }
  if (isRooms) {
    if (search !== "")
      navigate(
        `/rooms/?page=${pagesCurrent + 1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/rooms/?page=${pagesCurrent + 1}`);
  }
  if (isServices) {
    if (search !== "")
      navigate(
        `/services/?page=${pagesCurrent + 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/services/?page=${pagesCurrent + 1}`);
  }
  if (isDashboard) {
    if (search !== "")
      navigate(
        `/dashboards/?page=${pagesCurrent + 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/dashboards/?page=${pagesCurrent + 1}`);
  }
};
export const renderPaginationItems = (
  pageNumbers,
  pagesCurrent,
  numPage,
  navigate,
  search,
  isGuests,
  isRooms,
  isServices,
  isDashboard
) => {
  const maxVisiblePage = 5;
  if (pageNumbers?.length <= maxVisiblePage) {
    return pageNumbers?.map((index) => (
      <Pagination.Item
        key={index}
        active={pagesCurrent === index + 1}
        onClick={() =>
          handlePageChange(
            index + 1,
            navigate,
            search,
            isGuests,
            isRooms,
            isServices,
            isDashboard
          )
        }
      >
        {index + 1}
      </Pagination.Item>
    ));
  }
  const firstPage = Math.max(pagesCurrent - Math.floor(maxVisiblePage / 2), 1);
  const lastPage = Math.min(
    pagesCurrent + Math.floor(maxVisiblePage / 2),
    numPage
  );
  const items = [];
  if (firstPage > 1) {
    items.push(
      <Pagination.Ellipsis
        key={"start"}
        disabled
        style={{ cursor: "not-allowed" }}
      />
    );
  }

  for (let i = firstPage; i <= lastPage; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={pagesCurrent === i}
        onClick={() =>
          handlePageChange(
            i,
            navigate,
            search,
            isGuests,
            isRooms,
            isServices,
            isDashboard
          )
        }
      >
        {i}
      </Pagination.Item>
    );
  }

  if (lastPage < numPage) {
    items.push(
      <Pagination.Ellipsis
        key={"end"}
        disabled
        style={{ cursor: "not-allowed" }}
      />
    );
  }

  return items;
};
