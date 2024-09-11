export interface UserProfileInterface {
  username: string;
  avatar: string | null;
  password:string | null;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  fackbook_name: string;
}

export interface UserProfileDisplayInterface {
  id: number;
  username: string;
  avatar: string | null;
  email: string;

  role: string;
  first_name: string;
  last_name: string;
  fackbook_name: string;
}

