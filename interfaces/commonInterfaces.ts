export interface DataForNewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  newPassword?: string;
}
