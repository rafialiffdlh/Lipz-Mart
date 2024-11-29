export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  user_role?: 'user' | 'admin' | undefined;
  image?: string | undefined;
  access_token?: string | undefined;
  access_token_expires?: number | undefined;
}
