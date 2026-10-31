import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

interface GoBackProps {
  title?: string;
  description?: string;
  fallbackPath?: string;
}

export default function GoBack({
  title = "Page not found",
  description = "The page you're looking for may have been moved or doesn't exist.",
  fallbackPath = "/",
}: GoBackProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <ArrowLeft size={30} className="text-blue-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">{title}</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            onClick={() => navigate(fallbackPath, { replace: true })}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={17} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
