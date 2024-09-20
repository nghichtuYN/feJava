import { Fragment, useEffect, useState } from "react";
import "./App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { router } from "./routes/routers";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/User/UserSlice";
function App() {
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const username = process.env.REACT_APP_USER_NAME;
  const name = process.env.REACT_APP_NAME;
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        await dispatch(updateUser({ name: name, username: username }));
      }
      setIsUserLoaded(true); 
    };

    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  if (!isUserLoaded) {
    return <div>Loading user...</div>; // Hiển thị trạng thái loading cho đến khi user được cập nhật
  }

  return (
    <div className="App">
      <Routes>
        {router?.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout === "Admin" ? DefaultLayout : Fragment;
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
