import type { DashboardRole } from "../types/dashboard.types";

// UI-level navigation visibility only. Always enforce authorization in Spring Security.
export const rolePermissions: Record<DashboardRole, string[]> = {
  CUSTOMER: ["booking:read-own", "booking:create", "profile:manage-own", "payment:read-own"],
  TECHNICIAN: ["job:read-assigned", "job:update-assigned", "quotation:create-own", "availability:manage-own"],
  TECHNICIAN_SUPERVISOR: ["team:read", "job:assign", "job:monitor", "attendance:read"],
  CUSTOMER_SUPPORT: ["ticket:manage", "complaint:manage", "customer:read-limited"],
  OPERATIONS_MANAGER: ["booking:manage", "service:manage", "technician:coordinate", "report:read"],
  ADMIN: ["user:manage", "booking:manage", "service:manage", "payment:review", "report:read"],
  SUPER_ADMIN: ["platform:configure", "admin:manage", "permission:manage", "audit:read"],
};
