export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  faculty: string;
  course: string;
};

export type JwtUserPayload = {
  id: string;
  email: string;
};
