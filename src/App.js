import "./App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";
import SiteLayout from "./layouts/SiteLayout";
import { router } from "./routes/routers";
import { Routes, Route } from "react-router-dom";
function App() {
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
