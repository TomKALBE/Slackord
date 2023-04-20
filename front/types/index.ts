export { };

declare global {
  interface RegisterForm {
    email: string,
    pseudo:string,
    password: string
  }
  interface LoginForm {
    username: string,
    pseudo:string,
    password: string
  }
}
