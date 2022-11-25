import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const useUserId = (noRedirect?: boolean) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const username = (status === 'authenticated' && session.user) ? session.user.name : '';
  const { data: user, isLoading } = trpc.useQuery(["user.get", { username: username }]);

  if (!isLoading) {
    if ((!noRedirect) && !user) {
      router.push('/login')
    }
  }

  return user ? user?.id : ''
}

export default useUserId;

