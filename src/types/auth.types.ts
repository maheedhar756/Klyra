export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role?: string;
}