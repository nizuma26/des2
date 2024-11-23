import { useEffect, ReactNode, useState } from 'react';

//import useRefreshToken from '../hooks/use-refresh-token';
import { useRouter } from '../../routes/hooks';
import { useAuthPrivate } from '../hooks/use-auth-private';
import LoadingProgress from '../../components/loader/loading-progress';

function RequireAuth({ children }: { children: ReactNode }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // const refresh = useRefreshToken();
  const access = useAuthPrivate.getState().access;

  useEffect(() => {
    
    if (!access) {
      router.push('/login');
    }

    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   const verifyRefreshToken = async () => {
  //     try {
  //       await refresh();
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   !access ? verifyRefreshToken() : setIsLoading(false);
  // }, []);

  return isLoading ? <LoadingProgress /> : [children]
}

export default RequireAuth;
