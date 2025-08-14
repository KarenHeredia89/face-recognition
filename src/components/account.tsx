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
import { Button } from "@/components/ui/button";
import AppInput from "@/components/appInput";

export default function Account() {
  const { user, loadUser } = useAuth();
  const { updateUser } = useUser(loadUser);
  const [formInput, setFormInput] = useState({
    name: "",
    age: 0,
  });

  useEffect(() => {
    if (user) {
      setFormInput({
        name: user.name,
        age: Number(user?.age || 0),
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
    updateUser(user.id, formInput.name, Number(formInput.age));
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 text-sm text-start hover:bg-slate-800 rounded-md w-full">
        My Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
          <DialogDescription>Update your account information</DialogDescription>
          <div className="flex flex-col gap-2 my-4">
            <p>Name: {formInput.name}</p>
            <p>Email: {user.email}</p>
            <p>Images submitted: {user.entries}</p>
            <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
          </div>
          <AppInput
            label="Name"
            name="name"
            type="text"
            onChange={onHandleChangeInput}
            value={formInput.name}
            placeholder="Enter your name"
          />
          <AppInput
            label="Age"
            name="age"
            type="number"
            onChange={onHandleChangeInput}
            value={formInput.age}
            placeholder="Enter your age"
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
