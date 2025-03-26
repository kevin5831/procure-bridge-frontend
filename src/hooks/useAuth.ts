
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const MOCK_USER: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'Admin'
};

export function useAuth() {
  // Always return authenticated for demo purposes
  return {
    user: MOCK_USER,
    isLoading: false,
    isAuthenticated: true
  };
}
