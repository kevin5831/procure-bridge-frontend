
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InviteUserForm } from "./invite/InviteUserForm";

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteUserDialog({ open, onOpenChange }: InviteUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px]"
        aria-describedby="invite-user-description"
      >
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription id="invite-user-description">
            Send an invitation email to add a new user to the system.
          </DialogDescription>
        </DialogHeader>
        <InviteUserForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
