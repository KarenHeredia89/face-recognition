import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { User, ChevronsUpDown } from "lucide-react";
import Account from "./account";

const Navigation = ({
  onRouteChange,
  isSignedIn,
}: {
  onRouteChange: (route: string) => void;
  isSignedIn: boolean;
}) => {
  return (
    <nav className="flex justify-end items-center gap-4 px-6 bg-slate-900 text-white h-12">
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <Avatar className="bg-violet-500 flex items-center justify-center">
              <User className="size-6 text-white" />
            </Avatar>
            <ChevronsUpDown className="size-4 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Account />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onRouteChange("signin")}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
