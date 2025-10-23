import Login from '../Login'

export default function LoginExample() {
  return <Login onLogin={(token) => console.log('Logged in with token:', token)} />
}
