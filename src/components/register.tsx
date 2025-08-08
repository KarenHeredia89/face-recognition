import { useState } from "react";
import brain from "@/assets/brain.png";

export default function Register({
  onRouteChange,
  loadUser,
}: {
  onRouteChange: (route: string) => void;
  loadUser: (user: any) => void;
}) {
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
  const onSubmitRegister = () => {
    if (!registerName || !registerEmail || !registerPassword) {
      alert("Please enter your name, email and password");
      return;
    }
    fetch("http://localhost:8000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
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
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="name">
                Name
              </label>
              <input
                className="p-2 rounded-md bg-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Enter your name"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="email-address">
                Email
              </label>
              <input
                className="p-2 rounded-md bg-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Enter your email"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="p-2 rounded-md bg-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
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
            onClick={() => onRouteChange("signin")}
          >
            Sign In
          </a>
        </div>
      </main>
    </article>
  );
}
