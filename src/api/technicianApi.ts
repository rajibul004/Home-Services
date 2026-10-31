import { apiRequest } from "./client";

export const technicianApi = {
  // GET: Technician profile
  getProfile: () => apiRequest("/technician/profile"),

  // GET: All technician skills
  getSkills: () => apiRequest("/technician/skills"),

  // GET: Verified technician skills
  getVerifiedSkills: () => apiRequest("/technician/skills/verified"),

  // PATCH: Update technician work status
  updateWorkStatus: (status: string) =>
    apiRequest("/technician/work-status", {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
