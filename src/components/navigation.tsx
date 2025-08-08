const Navigation = ({
  onRouteChange,
  isSignedIn,
}: {
  onRouteChange: (route: string) => void;
  isSignedIn: boolean;
}) => {
  return (
    <nav className="flex justify-end items-center gap-4 px-6 bg-slate-900 text-white h-9">
      {isSignedIn ? (
        <p onClick={() => onRouteChange("signin")} className="cursor-pointer">
          Sign Out
        </p>
      ) : (
        <>
          <p onClick={() => onRouteChange("signin")} className="cursor-pointer">
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="cursor-pointer"
          >
            Register
          </p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
