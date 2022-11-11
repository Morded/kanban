import type { NextPage } from "next";
import { FiLogOut, FiGrid } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";
import { Task } from "../components/task";
import { Category } from "../components/category";

import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  // const t = trpc.example.getAll.useQuery({ text: 'getAll' });
  // console.log(t)

  return (
    <div className="flex gap-1 w-full flex-row justify-start min-h-screen overflow">

      <Category name="TODO" >
        <Task title={'test'} description={'test desc'} tags={['High', 'Design']} />
        <Task title={'test'} description={'test desc'} />
        <Task title={'test'} description={'test desc'} />
        <Task title={'test'} description={'test desc'} />
      </Category>

      <Category name="In progress" >
        <Task title={'test'} description={'test desc'} />
      </Category>

      <Category name="Done" >
        <Task title={'test'} description={'test desc'} />
      </Category>

    </div>
  );
};

export default Dashboard;

