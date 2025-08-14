import { useState } from "react";
import { useNavigate } from "react-router-dom";
import brain from "@/assets/brain.png";
import { useAuth } from "@/components/hooks/useAuth";
import AppInput from "@/components/appInput";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [registerName, setName] = useState("");
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmitRegister = async () => {
    if (!registerName || !registerEmail || !registerPassword) {
      alert("Please enter your name, email and password");
      return;
    }
    const user = await register(registerName, registerEmail, registerPassword);
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
            <AppInput
              label="Name"
              name="name"
              type="text"
              onChange={onNameChange}
              value={registerName}
              placeholder="Enter your name"
            />
            <AppInput
              label="Email"
              name="email"
              type="email"
              onChange={onEmailChange}
              value={registerEmail}
              placeholder="Enter your email"
            />
            <AppInput
              label="Password"
              name="password"
              type="password"
              onChange={onPasswordChange}
              value={registerPassword}
              placeholder="Enter your password"
            />
          </fieldset>
          <button
            onClick={onSubmitRegister}
            className="bg-violet-700 p-2 rounded-md mt-2 font-bold"
            type="submit"
          >
            Register
          </button>
          <a
            className="text-violet-500 mt-2 m-auto font-bold cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </a>
        </div>
      </main>
    </article>
  );
}
