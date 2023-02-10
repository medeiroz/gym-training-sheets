export interface IUser {
  sub: string|null,
  name: string,
  given_name: string,
  family_name: string,
  picture: string|null,
  email: string,
  email_verifies: boolean,
  hd: string|null
}