import { useState } from "react";
import { useNavigate } from "react-router-dom";
import brain from "@/assets/brain.png";
import { useAuth } from "@/components/hooks/useAuth";
import AppInput from "@/components/appInput";
import { Button } from "@/components/ui/button";

export default function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      onChange: onFormChange,
      value: registerForm.email,
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      onChange: onFormChange,
      value: registerForm.password,
      placeholder: "Enter your password",
    },
  ];

  const onSubmitSignIn = async () => {
    if (!registerForm.email || !registerForm.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    const user = await signIn(registerForm.email, registerForm.password);
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
            {inputs.map((input, i) => (
              <AppInput key={i} {...input} />
            ))}
          </fieldset>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button
            className="mt-6 bg-violet-700 text-white hover:bg-violet-600 font-bold cursor-pointer"
            onClick={onSubmitSignIn}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
          <Button
            variant="ghost"
            className="text-violet-500 font-bold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </main>
    </article>
  );
}
