export type DashboardRole =
  | "CUSTOMER"
  | "TECHNICIAN"
  | "TECHNICIAN_SUPERVISOR"
  | "CUSTOMER_SUPPORT"
  | "OPERATIONS_MANAGER"
  | "ADMIN"
  | "SUPER_ADMIN";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
  helper?: string;
}
