import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, type LoginResponse } from "../api/authApi";

const INK = "#0B2422";
const INK_SOFT = "#5A6B69";
const PLACEHOLDER = "#8B9B99";
const LINE = "#E2EAE8";
const ACCENT = "#0D9488";
const ACCENT_DARK = "#0F766E";
const PAPER = "#F8FAF9";

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 12S6 4.5 12 4.5 22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6 0 10.5 7 10.5 7a17.7 17.7 0 0 1-3.4 4.2M6.6 6.7C3.4 8.7 1.5 12 1.5 12s4.5 7 10.5 7a10 10 0 0 0 4.4-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const data: LoginResponse = await loginUser({
        identifier,
        password,
      });

      // Store authentication details
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", String(data.userId));
      localStorage.setItem("role", data.role);

      // Redirect according to role
      const dashboardRoutes: Record<string, string> = {
        CUSTOMER: "/dashboard/customer",
        TECHNICIAN: "/dashboard/user",
        TECHNICIAN_SUPERVISOR: "/dashboard/supervisor",
        CUSTOMER_SUPPORT: "/dashboard/support",
        OPERATIONS_MANAGER: "/dashboard/operations",
        ADMIN: "/dashboard/admin",
        SUPER_ADMIN: "/dashboard/super-admin",
      };

      const dashboardPath = dashboardRoutes[data.role];

      if (!dashboardPath) {
        throw new Error(`Unsupported user role: ${data.role}`);
      }

      navigate(dashboardPath, { replace: true });
    } catch (error: unknown) {
      console.error("Login Error:", error);

      setErrorMessage(
        "We couldn't log you in. Check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily:
          "'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif",
        background: `linear-gradient(160deg, ${PAPER} 0%, #F1F5F4 100%)`,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 h-16 shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: INK }}
          >
            <span className="text-white font-bold text-sm tracking-tight">
              S
            </span>
          </div>
          <span
            className="font-semibold text-[17px] tracking-tight"
            style={{ color: INK }}
          >
            Samadho
          </span>
        </div>

        <a
          href="mailto:support@samadho.com"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: INK_SOFT }}
        >
          Need help?
        </a>
      </header>

      {/* Content */}
      <main className="flex-1 grid lg:grid-cols-2 gap-0">
        {/* Left: Form */}
        <div className="flex items-center justify-center px-6 sm:px-12 py-10 lg:py-16">
          <div className="w-full max-w-[420px]">
            {/* Card */}
            <div
              className="rounded-3xl border bg-white p-8 sm:p-10"
              style={{
                borderColor: LINE,
                boxShadow: "0 20px 50px -12px rgba(11, 36, 34, 0.08)",
              }}
            >
              <div className="mb-8">
                <h1
                  className="text-[1.85rem] sm:text-[2.1rem] font-extrabold tracking-tight leading-tight"
                  style={{ color: INK }}
                >
                  Welcome back
                </h1>
                <p
                  className="mt-2.5 text-[15px] leading-relaxed"
                  style={{ color: INK_SOFT }}
                >
                  Log in to manage your appliance services and bookings.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Identifier */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-[13px] font-semibold mb-2 tracking-wide uppercase"
                    style={{ color: INK_SOFT }}
                  >
                    Email or Phone
                  </label>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com or 98765 43210"
                    className="w-full h-[52px] rounded-2xl border bg-white px-4 text-[15px] outline-none transition-all duration-200"
                    style={{
                      borderColor: LINE,
                      color: INK,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 0 4px ${ACCENT}18`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = LINE;
                      e.currentTarget.style.boxShadow =
                        "0 1px 2px rgba(0,0,0,0.02)";
                    }}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-[13px] font-semibold tracking-wide uppercase"
                      style={{ color: INK_SOFT }}
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[13px] font-semibold transition-colors"
                      style={{ color: ACCENT }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = ACCENT_DARK)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = ACCENT)
                      }
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[52px] rounded-2xl border bg-white px-4 pr-12 text-[15px] outline-none transition-all duration-200"
                      style={{
                        borderColor: LINE,
                        color: INK,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 4px ${ACCENT}18`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = LINE;
                        e.currentTarget.style.boxShadow =
                          "0 1px 2px rgba(0,0,0,0.02)";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: PLACEHOLDER }}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-2xl border px-4 py-3.5 text-sm font-medium"
                    style={{
                      borderColor: "#F3D3D1",
                      backgroundColor: "#FEF6F5",
                      color: "#B91C1C",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: INK,
                    boxShadow: "0 4px 14px rgba(11, 36, 34, 0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#071A18";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(11, 36, 34, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = INK;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(11, 36, 34, 0.25)";
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon className="h-4 w-4 animate-spin" />
                      Logging in…
                    </>
                  ) : (
                    "Log in to Samadho"
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: LINE }}>
                <p className="text-sm text-center" style={{ color: INK_SOFT }}>
                  New to Samadho?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold transition-colors"
                    style={{ color: ACCENT }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = ACCENT_DARK)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            {/* Secure badge */}
            <div
              className="mt-6 flex items-center justify-center gap-2 text-[13px]"
              style={{ color: INK_SOFT }}
            >
              <ShieldIcon />
              <span>Encrypted & secure login</span>
            </div>
          </div>
        </div>

        {/* Right: Premium trust panel */}
        <div
          className="hidden lg:flex flex-col justify-center px-14 xl:px-20 py-16 relative overflow-hidden"
          style={{ backgroundColor: INK }}
        >
          {/* Soft gradient overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse at 70% 20%, ${ACCENT}40 0%, transparent 55%)`,
            }}
          />

          <div className="relative z-10 max-w-[380px]">
            <div className="mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium mb-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#E0F2F1",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                Trusted home service platform
              </div>

              <h2 className="text-3xl xl:text-[2.4rem] font-extrabold tracking-tight text-white leading-tight">
                Expert appliance care, right at your doorstep.
              </h2>
              <p
                className="mt-4 text-[16px] leading-relaxed"
                style={{ color: "#A7C4C1" }}
              >
                Book verified technicians, get transparent quotes, and track
                every repair in real time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-2xl font-extrabold text-white">10k+</p>
                <p className="mt-1 text-sm" style={{ color: "#A7C4C1" }}>
                  Happy households
                </p>
              </div>
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-2xl font-extrabold text-white">4.8★</p>
                <p className="mt-1 text-sm" style={{ color: "#A7C4C1" }}>
                  Average rating
                </p>
              </div>
            </div>

            {/* Trust points */}
            <div className="space-y-4">
              <div
                className="flex items-center gap-3 text-[15px]"
                style={{ color: "#D1E8E5" }}
              >
                <span style={{ color: ACCENT }}>
                  <CheckCircleIcon />
                </span>
                Verified & background-checked technicians
              </div>
              <div
                className="flex items-center gap-3 text-[15px]"
                style={{ color: "#D1E8E5" }}
              >
                <span style={{ color: ACCENT }}>
                  <CheckCircleIcon />
                </span>
                Transparent pricing before any work starts
              </div>
              <div
                className="flex items-center gap-3 text-[15px]"
                style={{ color: "#D1E8E5" }}
              >
                <span style={{ color: ACCENT }}>
                  <CheckCircleIcon />
                </span>
                Real-time tracking & service updates
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
