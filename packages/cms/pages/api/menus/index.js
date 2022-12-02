export default function handler(req, res) {
  res.status(200).json([
    {
      id: "1",
      title: "前端框架",
      children: [
        {
          id: "2",
          title: "Vue",
        },
        {
          id: "3",
          title: "React",
        },
      ],
    },
    {
      id: "4",
      title: "前端基础",
      children: [
        {
          id: "5",
          title: "JavaScript",
        },
        {
          id: "6",
          title: "CSS",
        },
      ],
    },
  ]);
}
