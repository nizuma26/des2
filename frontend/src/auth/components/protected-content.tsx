import { ReactNode, forwardRef, useEffect } from "react";
import { useUserPermissions } from "../hooks/use-user-permissions"
import { useRouter } from "../../routes/hooks";

import { jwtDecode } from 'jwt-decode';

import { TokenDecode } from "../../types";

import { useAuthPrivate } from "../hooks/use-auth-private";

interface ProtectedContentProps {
  children?: ReactNode | ReactNode[];
  fallback?: ReactNode | ReactNode[];
  perms: string[];
  to?: string;
}

const ProtectedContent = forwardRef(({ children, perms, fallback, to }:ProtectedContentProps, ref) => {

  const { data: userPermissions={views: [], others: []} } = useUserPermissions();

  const token = useAuthPrivate((state) => state.access)

  const tokenDecode: TokenDecode = jwtDecode(token);
  
  const router = useRouter();

  const permissionsSet = new Set([...userPermissions.views, ...userPermissions.others]);

  const showContent = perms.some((perm:string) => permissionsSet?.has(perm));

  useEffect(() => {
    if (!!to && showContent === false && tokenDecode.is_superuser === false) router.replace(to)
  }, [showContent])


  return tokenDecode.is_superuser || showContent ? <>{children}</> : <>{fallback}</>
})

export default ProtectedContent;