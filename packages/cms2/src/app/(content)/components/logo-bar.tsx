import Link from "next/link";

export default function LogoBar() {
  return (
    <div className="h-[30px]">
      <Link href="/" className="btn btn-ghost px-2">
        <span className="pr-1">Smarty</span>
        <span>Team</span>
      </Link>
    </div>
  );
}
