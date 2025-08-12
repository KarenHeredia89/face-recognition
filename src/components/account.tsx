import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Account() {
  return (
    <Dialog>
      <DialogTrigger className="p-2 text-sm text-start hover:bg-slate-800 rounded-md w-full">
        My Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
