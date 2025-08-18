import { useEffect, useState } from "react";
import { useAuth } from "@/components/hooks/useAuth";
import { useUser } from "@/components/hooks/useUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppInput from "@/components/appInput";

export default function Account() {
  const { user } = useAuth();
  const { updateUserProfile } = useUser();
  const [formInput, setFormInput] = useState({
    name: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormInput({
        name: user.name,
      });
    }
  }, [user]);

  if (!user) return <div className="p-2 text-sm">Loading...</div>;

  const onHandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    updateUserProfile(user.id, formInput.name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-2 text-sm text-start hover:bg-slate-800 rounded-md w-full">
        My Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
          <DialogDescription>Update your account information</DialogDescription>
          <Card className="my-4">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar className="bg-slate-500 flex items-center justify-center">
                  <User className="size-6 text-white" />
                </Avatar>
                <div>
                  <CardTitle>{formInput.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{user.entries} Images submitted</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-slate-400">
                Member since {new Date(user.joined).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
          <AppInput
            label="Name"
            name="name"
            type="text"
            onChange={onHandleChangeInput}
            value={formInput.name}
            placeholder="Enter your name"
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onSubmit}
              className="bg-violet-700 text-white hover:bg-violet-600 font-bold cursor-pointer"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
