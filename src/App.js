import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Allegretto from "./scenes/lasers/Alelegretto";
import Visx from "./scenes/lasers/Visx";
import { useAuth0 } from "@auth0/auth0-react";
import Constellation from "./scenes/lasers/Constellation";
import Intrelaser from "./scenes/lasers/Intralaser";
import LaserSigth from "./scenes/lasers/LaserSigth";
import { Provider } from 'react-redux';
import { useStore } from './redux/store';
import Custumer from "./scenes/customers";
import Owners from "./scenes/onwers";
import EditOS from "./scenes/dashboard/OS/EditOs";
import Equipments from "./scenes/equipamentos";
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const store = useStore();

  
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();


  if (!isAuthenticated && !isLoading) {
  loginWithRedirect();
  }


  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: 'flex' }}>
            <Sidebar isSidebar={isSidebar} />
            <main className="content" style={{ padding: '16px', overflowY: 'auto', height: '100vh' }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/allegretto" element={<Allegretto />} />
                <Route path="/visx" element={<Visx />} />
                <Route path="/constellation" element={<Constellation />} />
                <Route path="/intralaser" element={<Intrelaser />} />
                <Route path="/laser-sigth" element={<LaserSigth />} />
                <Route path="/customer" element={<Owners />} />
                <Route path="/visitas" element={<Custumer />} />
                <Route path="/aparelho" element={<Equipments />} />
                <Route path="/edit-os/:equipmentId" element={<EditOS />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
