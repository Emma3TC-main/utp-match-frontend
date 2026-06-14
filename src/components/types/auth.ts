export type AuthUserMenu = {
  id: string;
  email: string;
  name: string;
} | null;

export type ProfileUser = {
  name: string;
  email: string;
  phone?: string;
  description?: string;
  photo?: string;
} | null;

export type ProfileUpdates = {
  name?: string;
  phone?: string;
  description?: string;
};

export type AuthFormData = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};
