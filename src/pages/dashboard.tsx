import type { NextPage } from "next";
import { FiLogOut, FiGrid } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";

const Dashboard: NextPage = () => {
  return (
    <>
      <Navigation>
        <NavButton
          label="Dashboard"
          icon={FiGrid}
          href="dashboard"
        />
        <div className="p-5"></div>
        <NavButton
          label="Sign out"
          icon={FiLogOut}
          href="logout"
        />
        <div className="p-5"></div>
      </Navigation>

      <div className="grid"></div>

    </>
  );
};

export default Dashboard;

