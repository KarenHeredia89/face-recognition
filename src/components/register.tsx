import { useState } from "react";
import { useNavigate } from "react-router-dom";
import brain from "@/assets/brain.png";
import { useAuth } from "@/components/hooks/useAuth";
import AppInput from "@/components/appInput";
import { Button } from "@/components/ui/button";

export default function Register() {
  const { register, errors, isLoading } = useAuth();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      label: "Name",
      name: "name",
      type: "text",
      onChange: onFormChange,
      value: registerForm.name,
      placeholder: "Enter your name",
      error: errors?.name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      onChange: onFormChange,
      value: registerForm.email,
      placeholder: "Enter your email",
      error: errors?.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      onChange: onFormChange,
      value: registerForm.password,
      placeholder: "Enter your password",
      error: errors?.password,
    },
  ];

  const onSubmitRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError("Please enter your name, email and password");
      return;
    }
    const user = await register(
      registerForm.name,
      registerForm.email,
      registerForm.password
    );
    if (user?.id) {
      navigate("/home");
    }
  };

  return (
    <article className="flex justify-center items-center h-full text-white p-6">
      <main className="p-6 rounded-md bg-slate-900 w-full">
        <div className="flex flex-col gap-4">
          <img src={brain} alt="logo" style={{ width: "60px" }} />
          <fieldset id="register" className="flex flex-col gap-6">
            <legend className="text-2xl text-violet-500 font-bold mb-2">
              Create an account
            </legend>
            <p className="text-sm text-slate-400">
              Please enter your name, email and password to create an account.
            </p>
            {inputs.map((input, i) => (
              <AppInput key={i} {...input} />
            ))}
          </fieldset>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {errors?.general && (
            <p className="text-sm text-red-500 mt-2">{errors.general}</p>
          )}
          <Button
            onClick={onSubmitRegister}
            className="mt-6 bg-violet-700 text-white hover:bg-violet-600 font-bold cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <Button
            variant="ghost"
            className="text-violet-500 font-bold cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </div>
      </main>
    </article>
  );
}
