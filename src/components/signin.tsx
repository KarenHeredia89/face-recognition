import { useState } from "react";
import brain from "@/assets/brain.png";

export default function Signin({
  onRouteChange,
  loadUser,
}: {
  onRouteChange: (route: string) => void;
  loadUser: (user: any) => void;
}) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
    if (!signInEmail || !signInPassword) {
      alert("Please enter your email and password");
      return;
    }
    fetch("http://localhost:8000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
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
          <fieldset id="sign_up" className="flex flex-col gap-6">
            <legend className="text-2xl text-violet-500 font-bold mb-2">
              Login to your account
            </legend>
            <p className="text-sm text-slate-400">
              Please enter your email and password to login to your account.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="p-2 rounded-md bg-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Enter your email"
                type="email"
                name="email-address"
                id="email-address"
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
            className="bg-violet-700 p-2 rounded-md mt-2 font-bold"
            onClick={onSubmitSignIn}
            type="submit"
          >
            Sign In
          </button>
          <a
            className="text-violet-500 mt-2 m-auto font-bold cursor-pointer"
            onClick={() => onRouteChange("register")}
          >
            Register
          </a>
        </div>
      </main>
    </article>
  );
}
