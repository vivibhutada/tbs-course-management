import {
  IoHomeOutline,
  IoBookOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoWalletOutline,
} from "react-icons/io5";

export const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoHomeOutline fontSize={20} />,
  },
  { title: "Courses", path: "/courses", icon: <IoBookOutline fontSize={20} /> },
  { title: "Trainers", path: "/trainers", icon: <IoPersonOutline fontSize={20} /> },
  {
    title: "Students",
    path: "/students",
    icon: <IoPeopleOutline fontSize={20} />,
  },
  {
    title: "Batches",
    path: "/batches",
    icon: <IoSchoolOutline fontSize={20} />,
  },
  {
    title: "Payments",
    path: "/payments",
    icon: <IoWalletOutline fontSize={20} />,
  },
];
