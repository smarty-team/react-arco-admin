import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()
  
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate('/')}>登录</button>
    </div>
  )
}