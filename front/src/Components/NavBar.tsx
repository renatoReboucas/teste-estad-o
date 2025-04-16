import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/assets/Group 4394.png"
            alt="Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
      <Link href={"/admin"} className="text-gray-600 font-semibold">
        Admin
      </Link>
    </nav>
  );
}
