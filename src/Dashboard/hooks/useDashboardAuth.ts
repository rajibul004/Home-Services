import { useMemo } from "react";
import type { DashboardRole } from "../types/dashboard.types";

const validRoles: DashboardRole[] = [
  "CUSTOMER", "TECHNICIAN", "TECHNICIAN_SUPERVISOR",
  "CUSTOMER_SUPPORT", "OPERATIONS_MANAGER", "ADMIN", "SUPER_ADMIN",
];

export function useDashboardAuth() {
  return useMemo(() => {
    const role = localStorage.getItem("role") as DashboardRole | null;
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    return {
      role: role && validRoles.includes(role) ? role : null,
      accessToken,
      userId,
      isAuthenticated: Boolean(accessToken && role && validRoles.includes(role)),
    };
  }, []);
}
