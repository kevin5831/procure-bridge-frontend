
import { useState } from 'react';
import type { Database } from '@/integrations/supabase/types';

export type UserRole = Database['public']['Enums']['user_role'];

export function useUserRole() {
  const [role] = useState<UserRole>('ADMIN');
  
  return { 
    role, 
    isLoading: false 
  };
}
