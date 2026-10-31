import { useEffect, useState } from "react";
import {
  UserRound,
  Wrench,
  ShieldCheck,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { apiRequest } from "../../../api/client";
import { useNavigate } from "react-router-dom";

interface TechnicianProfile {
  id?: number;
  fullName?: string;
  email?: string;
  phone?: string;
}

interface TechnicianSkill {
  id?: number;
  name?: string;
  skillName?: string;
}

export default function TechnicianDashboard() {
  const [profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [skills, setSkills] = useState<TechnicianSkill[]>([]);
  const [verifiedSkills, setVerifiedSkills] = useState<TechnicianSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const profileData = await apiRequest<TechnicianProfile>(
        "/technician/profile",
      );

      const skillsData =
        await apiRequest<TechnicianSkill[]>("/technician/skills");

      const verifiedData = await apiRequest<TechnicianSkill[]>(
        "/technician/skills/verified",
      );

      setProfile(profileData);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
      setVerifiedSkills(Array.isArray(verifiedData) ? verifiedData : []);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load technician dashboard";

      setError(message);

      const status = (err as Error & { status?: number }).status;

      if (status === 401) {
      } else if (status === 403) {
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    loadDashboard();
  }, [navigate]);

  return (
    <DashboardLayout role="TECHNICIAN">
      <PageHeader
        eyebrow="TECHNICIAN WORKSPACE"
        title={`Welcome, ${profile?.fullName ?? "Technician"}`}
        description="Manage your profile, skills and service activities."
        action={
          <button
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        }
      />

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
          Loading technician information...
        </div>
      ) : (
        <>
          {/* Technician Profile */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <UserRound size={27} />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {profile?.fullName ?? "Technician"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {profile?.email ?? "Email not available"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {profile?.phone ?? "Phone not available"}
                </p>
                <div className="mt-2">
                  <StatusBadge tone="success">Technician account</StatusBadge>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total skills"
              value={String(skills.length)}
              note="Registered skills"
              icon={Wrench}
            />

            <StatCard
              title="Verified skills"
              value={String(verifiedSkills.length)}
              note="Approved skills"
              icon={ShieldCheck}
            />

            <StatCard
              title="Account"
              value="Active"
              note="Technician workspace"
              icon={BriefcaseBusiness}
            />
          </div>

          {/* Technician Skills */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-extrabold text-slate-900">My Skills</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your registered technician skills
            </p>

            {skills.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">
                No skills registered yet.
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  const verified = verifiedSkills.some(
                    (item) => item.id === skill.id,
                  );

                  return (
                    <span
                      key={skill.id ?? index}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {skill.name ?? skill.skillName ?? "Skill"}

                      {verified && (
                        <ShieldCheck size={15} className="text-emerald-600" />
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
