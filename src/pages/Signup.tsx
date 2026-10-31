import { useState, type FormEvent } from "react";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Full name is required.");
      return;
    }

    if (trimmedName.length > 100) {
      setError("Name must not exceed 100 characters.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      setError("Enter a valid 10-digit Indian phone number.");
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.length > 64) {
      setError("Password must be between 8 and 64 characters.");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        password,
      )
    ) {
      setError(
        "Password must contain uppercase, lowercase, number and special character (@$!%*?&).",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Do not send role. Backend assigns CUSTOMER.
    const payload = {
      fullName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail || null,
      password,
    };

    try {
      setLoading(true);

      await signupUser(payload);

      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please sign in." },
      });
    } catch (err: unknown) {
      console.error("Signup failed:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to create account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-15%] h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl lg:min-h-[760px] lg:grid-cols-[45%_55%]">
        {/* Left section */}
        <div className="hidden flex-col justify-center px-14 lg:flex xl:px-20">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Samadho
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight text-white">
            Start Your
            <br />
            Repair Journey.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Create your account and manage your repair services, bookings,
            products and service history in one place.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
            <UserPlus size={18} className="text-violet-400" />
            Simple and secure customer registration
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-center p-5 sm:p-10">
          <div className="w-full max-w-[520px] rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,.5)] sm:p-9">
            <div className="mb-7">
              <h2 className="text-3xl font-semibold text-white">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Join Samadho and manage your services.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  maxLength={100}
                  autoComplete="name"
                  required
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="9876543210"
                  maxLength={10}
                  autoComplete="tel-national"
                  required
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Email Address{" "}
                  <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm text-white outline-none transition focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm text-white outline-none transition focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-violet-400 hover:text-violet-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
