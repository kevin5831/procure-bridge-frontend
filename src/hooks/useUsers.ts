
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'Admin',
    status: 'active',
    department: 'IT',
    createdAt: new Date().toISOString(),
  }
];

export function useUsers() {
  const fetchUsers = async () => {
    // Mock fetching users
    console.log('Fetching users');
    return mockUsers;
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    console.log('Updating user status:', { userId, isActive });
  };

  const deleteUser = async (userId: string) => {
    console.log('Deleting user:', userId);
  };

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return {
    users,
    isLoading,
    error,
    updateUserStatus,
    deleteUser,
    refetch,
  };
}
