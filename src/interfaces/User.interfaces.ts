export interface UserInterface {
  id?: number;
  name: string;
  lastname?: string;
  email: string;
  password: string;
}

export interface UserUpdateInt{
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
}