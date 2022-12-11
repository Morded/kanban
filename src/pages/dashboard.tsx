import type { NextPage } from "next";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import useUserId from "../components/hooks/useUserId";
import RandomQuote from "../components/randomQuote";
import CategoryTaskCountCard from "../components/categoryTaskCountCard";

const Dashboard: NextPage = () => {
  const userId = useUserId();

  const utils = trpc.useContext();
  const createDefaults = trpc.useMutation(["category.createDefaults"], {
    async onSuccess() {
      await utils.invalidateQueries(["category.getAllActive"]);
    }
  });

  useEffect(() => {
    createDefaults.mutateAsync({ userId: userId });
  }, [userId])

  return (
    <div className="flex flex-col p-4 gap-20 h-full pt-24 items-center justify-start md:justify-center md:pt-0 items-start w-full text-white">
      <RandomQuote />
      <CategoryTaskCountCard userId={userId} />
    </div>
  );
};

export default Dashboard;

