import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
function Dashboard(props) {
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    themeContext.setTitle("dashboard.dashboard", <DashboardOutlinedIcon />);
  }, []);
  return (
    <div className="dashboard">

    </div>
  );
}

export default Dashboard;
