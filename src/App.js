import { useEffect, useState } from "react";
import "./App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";
import SiteLayout from "./layouts/SiteLayout";
import { router } from "./routes/routers";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/User/UserSlice";
function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const username = process.env.REACT_APP_USER_NAME;
  const name = process.env.REACT_APP_NAME;
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        await dispatch(updateUser({ name: name, username: username })); // Chờ dispatch xong
      }
      setIsUserLoaded(true); // Đánh dấu quá trình cập nhật user đã hoàn tất
    };

    fetchUser();
  }, [dispatch]);
  if (!isUserLoaded) {
    return <div>Loading user...</div>; // Hiển thị trạng thái loading cho đến khi user được cập nhật
  }

  return (
    <div className="App">
      <Routes>
        {router?.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout === "Admin" ? DefaultLayout : SiteLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
