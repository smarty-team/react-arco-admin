import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
// 定义了服务端返回的初始化的html内容
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 必须加入html和body
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}