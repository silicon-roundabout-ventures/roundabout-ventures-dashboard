import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { checkSession, login } = useAuth();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    checkSession().then((user) => {
      if (user) navigate("/dashboard");
    });
  }, [checkSession]);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await login(data.email);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-srv-dark px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="text-sm text-srv-gray">
            Enter your email to receive a magic link
          </p>
        </div>

        {sent ? (
          <div className="rounded-md border border-white/20 bg-black/30 backdrop-blur-sm p-4 text-center space-y-1">
            <p className="text-sm text-white font-medium">Check your email</p>
            <p className="text-sm text-srv-gray">
              If we found an account, you'll have an email with a link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="flex h-10 w-full rounded-md border-2 border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-srv-teal/60 transition-colors"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-srv-pink">{errors.email.message}</p>
              )}
            </div>

            {error && <p className="text-sm text-srv-pink">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-md bg-white hover:bg-gray-200 text-srv-dark font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
