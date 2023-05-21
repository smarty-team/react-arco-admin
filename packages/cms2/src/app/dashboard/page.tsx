'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter()
  const jumtTo = () => router.push('/list/3')
  
  return (
    <div>
      Dashboard Page
      <ul>
        <li>
          <Link href="/list/1">item 1</Link>
        </li>
        <li>
          <Link href="/list/2">item 2</Link>
        </li>
      </ul>

      <button onClick={jumtTo}>item 3</button>
    </div>
  )
}