// for ISR：重新生成指定path的页面
export default async function handler(req, res) {
  // 检查secret确认这是一个合法请求
  if (req.query.secret !== process.env.VALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // 传入要刷新页面的path
    // 比如："/posts/[id]" 应该是 "/posts/1"
    await res.revalidate('/posts/' + req.query.id)
    return res.json({ revalidated: true })
  } catch (err) {
    // 如果有错误发生, Next会继续显示之前成功生成的页面
    return res.status(500).send('Error revalidating')
  }
}