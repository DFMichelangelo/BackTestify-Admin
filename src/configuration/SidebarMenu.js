import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
const SidebarMenu = [
  {
    type: "item",
    id: "Dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "users.users",
    to: "/users-management-system",
    icon: <GroupOutlinedIcon />,
    exact: false
  },
  {
    type: "item",
    id: "feedbacks.feedbacks",
    to: "/feedbacks",
    icon: <BugReportOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "Logs",
    to: "/logs",
    icon: <AssignmentOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "Database",
    to: "/database",
    icon: <StorageOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "GDPR",
    to: "/gdpr",
    icon: <GavelOutlinedIcon />,
    exact: true,
  },
];

export default SidebarMenu;
