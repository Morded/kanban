import type { NextPage } from "next";
import { FiLogOut, FiGrid } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";
import { Task } from "../components/task";

const Dashboard: NextPage = () => {
  return (
    <>
      <Navigation>
        <NavButton
          label="Dashboard"
          icon={FiGrid}
          href="dashboard"
        />
        <NavButton
          label="Sign out"
          icon={FiLogOut}
          href="logout"
        />
      </Navigation>

      <div className="grid w-96">
        <Task title={'test'} description={'test desc'} />
      </div>

    </>
  );
};

export default Dashboard;

