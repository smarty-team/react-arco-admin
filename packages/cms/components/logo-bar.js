import Link from "next/link";

export function LogoBar() {
  return (
    <div>
      <Link href="/" className="flex-0 btn btn-ghost px-2">
        <span className="pr-1">Smarty</span>
        <span>Team</span>
      </Link>
    </div>
  );
}
