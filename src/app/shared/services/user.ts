export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  emailVerified: boolean;
}
