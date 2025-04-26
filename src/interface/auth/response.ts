export interface LoginResponse {
  user: {
    id: number;
    username: string;
    name: string;
  };
  token: string;
}
