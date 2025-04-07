import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { useRouter } from "@/hooks/use-router";
import { useSearchParams } from "@/hooks/use-search-params";
// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || "/dashboard";

  const token = localStorage.getItem("token");
  const isTokenExpired = () => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    } catch (error) {
      return true;
    }
  };

  const check = useCallback(() => {
    if (!isTokenExpired()) {
      router.replace(returnTo);
    }
  }, [returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
