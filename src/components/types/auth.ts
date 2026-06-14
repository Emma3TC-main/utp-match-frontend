export type AuthUserMenu = {
  id: string;
  email?: string | null;
  name: string;
} | null;

export type ProfileUser = {
  name: string;
  email?: string | null;
  phone?: string;
  description?: string;
  photo?: string;
} | null;

export type ProfileUpdates = {
  name?: string;
  phone?: string;
  description?: string;
};

