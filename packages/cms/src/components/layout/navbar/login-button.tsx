import { useRouter } from "next/router";

export default function LoginButton() {
  const router = useRouter()
  const onLogin = () => router.push('/login')
  return <button className="btn btn-ghost" onClick={onLogin}>登录/注册</button>;
}
