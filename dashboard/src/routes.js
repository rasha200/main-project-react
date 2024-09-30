


// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Courses  from "./layouts/courses";
import Events  from "./layouts/events";
import Addstudent from "./layouts/addstudent";
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import { Task } from "@mui/icons-material";
import Tasks from "./layouts/tasks";
import Feedback from "layouts/Feedback";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <Office size="12px" />,
    component: <Courses />,
    noCollapse: true,
  },
  {
    type: "collapse",

    name: "task",
    key: "tasks",
    route: "/task",
    icon: <CreditCard size="12px" />,
    component: <Tasks />,

    name: "Feedback",
    key: "Feedback",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Feedback />,

    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    name: "Events",
    key: "events",
    route: "/events",
    icon: <Office size="12px" />,
    component: <Events />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Add Students",
    key: "addstudent",
    route: "/addstudent",
    icon: <Office size="12px" />,
    component: <Addstudent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "mustafa",
    key: "mustafa",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
