
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInvitations } from "@/hooks/useInvitations";
import { toast } from "sonner";
import { roles, departments } from "./constants";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  department: z.string().min(1, "Please select a department"),
});

interface InviteUserFormProps {
  onSuccess: () => void;
}

export function InviteUserForm({ onSuccess }: InviteUserFormProps) {
  const { createInvitation, getInvitationsByEmail } = useInvitations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
      department: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Check if user already has a pending invitation
      const { data: existingInvitation, error: checkError } = await getInvitationsByEmail(values.email);
      
      if (checkError) {
        toast.error("Failed to check existing invitations");
        return;
      }

      if (existingInvitation) {
        toast.error("This email already has a pending invitation");
        return;
      }

      // Create new invitation
      const { error } = await createInvitation(values.email, values.role, values.department);
      
      if (error) {
        if (error.code === "42501") {
          toast.error("You don't have permission to invite users");
        } else {
          toast.error("Failed to send user invitation");
        }
        return;
      }

      toast.success("User invitation sent successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("Failed to send user invitation");
      console.error("Invitation error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
          >
            Cancel
          </Button>
          <Button type="submit">
            Send Invitation
          </Button>
        </div>
      </form>
    </Form>
  );
}
