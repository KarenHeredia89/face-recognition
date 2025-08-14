import { useState } from "react";
import { useNavigate } from "react-router-dom";
import brain from "@/assets/brain.png";
import { useAuth } from "@/components/hooks/useAuth";
import AppInput from "@/components/appInput";

export default function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = async () => {
    if (!signInEmail || !signInPassword) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    const user = await signIn(signInEmail, signInPassword);
    setLoading(false);

    if (user) {
      navigate("/home");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <article className="flex justify-center items-center h-full text-white p-6">
      <main className="p-6 rounded-md bg-slate-900 w-full">
        <div className="flex flex-col gap-4">
          <img src={brain} alt="logo" style={{ width: "60px" }} />
          <fieldset id="sign_up" className="flex flex-col gap-6">
            <legend className="text-2xl text-violet-500 font-bold mb-2">
              Login to your account
            </legend>
            <p className="text-sm text-slate-400">
              Please enter your email and password to login to your account.
            </p>
            <AppInput
              label="Email"
              name="email"
              type="email"
              onChange={onEmailChange}
              value={signInEmail}
              placeholder="Enter your email"
            />
            <AppInput
              label="Password"
              name="password"
              type="password"
              onChange={onPasswordChange}
              value={signInPassword}
              placeholder="Enter your password"
            />
          </fieldset>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="bg-violet-700 p-2 rounded-md mt-2 font-bold"
            onClick={onSubmitSignIn}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
          <a
            className="text-violet-500 mt-2 m-auto font-bold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </a>
        </div>
      </main>
    </article>
  );
}
