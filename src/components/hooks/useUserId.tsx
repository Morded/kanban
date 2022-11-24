import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

const useUserId = () => {
  const { data: session, status } = useSession();

  const username = (status === 'authenticated' && session.user) ? session.user.name : '';
  const { data: user, isLoading } = trpc.useQuery(["user.get", { username: username }]);
  return { userId: user ? user?.id : '', isLoading: isLoading };
}

export default useUserId;

