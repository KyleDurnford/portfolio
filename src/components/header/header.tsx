import Link from "next/link";

const Header = () => {
  return (
    <header className=" text-white py-12">
      <nav className="flex justify-start gap-4">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/projects" className="hover:text-gray-300">
          Projects
        </Link>
        <Link href="/maps" className="hover:text-gray-300">
          Maps
        </Link>
      </nav>
    </header>
  );
};
export default Header;
