export interface UserProfileInterface {
  username: string;
  avatar: string | null;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  fackbook_name: string;
  phone_number: string | null;
  date_of_birth: string | null;
  gender: number | null;
}

export interface UserProfileDisplayInterface {
  id: number | null;
  username: string;
  avatar: string | null;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  fackbook_name: string;
  phone_number: string | null;
  date_of_birth: string | null;
  gender: number | null;
}

export interface GenderInterface {
  id: number;
  name: string;
}
