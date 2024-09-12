import DashBoardPage from "../page/DashBoardPage/DashBoardPage";
import GuestPage from "../page/GuestPage/GuestPage";
import RoomPage from "../page/RoomPage/RoomPage";
import ServicePage from "../page/ServicePage/ServicePage";

export const router = [
  { path: "/dashboard", component: DashBoardPage, layout: "Admin" },
  { path: "/guests", component: GuestPage, layout: "Admin" },
  { path: "/rooms", component: RoomPage, layout: "Admin" },
  { path: "/services", component: ServicePage, layout: "Admin" },
  { path: "/bookings", component: ServicePage, layout: "Admin" },
];
