import { User, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import Account from "@/components/account";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const onSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <nav className="flex justify-end items-center gap-4 px-6 bg-slate-900 text-white h-12">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <Avatar className="bg-violet-500 flex items-center justify-center">
              <User className="size-6 text-white" />
            </Avatar>
            <ChevronsUpDown className="size-4 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Account />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link to="/signin">
            <p className="cursor-pointer">Sign In</p>
          </Link>
          <Link to="/register">
            <p className="cursor-pointer">Register</p>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
