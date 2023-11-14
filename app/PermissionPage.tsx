import { useEffect } from "react";
import { useAuthContext } from "./Providers";
import { useRouter } from "next/navigation";
interface RouteProps {
  children: React.ReactNode;
}

const PermissionPage: React.FC<RouteProps> = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return <>{user && children}</>;
};

export default PermissionPage;
