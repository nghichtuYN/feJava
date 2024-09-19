import BookingsPage from "../page/BookingsPage/BookingsPage";
import DashBoardPage from "../page/DashBoardPage/DashBoardPage";
import DetailGuestPage from "../page/DetailGuestPage/DetailGuestPage";
import GuestPage from "../page/GuestPage/GuestPage";
import RoomPage from "../page/RoomPage/RoomPage";
import ServicePage from "../page/ServicePage/ServicePage";

export const router = [
  { path: "/dashboard", component: DashBoardPage, layout: "Admin" },
  { path: "/guests", component: GuestPage, layout: "Admin" },
  { path: "/guests/:id", component: DetailGuestPage, layout: "Admin" },
  { path: "/rooms", component: RoomPage, layout: "Admin" },
  { path: "/services", component: ServicePage, layout: "Admin" },
  { path: "/bookings", component: BookingsPage, layout: "Admin" },
];
