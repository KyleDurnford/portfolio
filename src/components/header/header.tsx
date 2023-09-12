import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between">
            <Link href="/">
              <a className="text-xl font-semibold">Home</a>
            </Link>
            <div className="space-x-4">
              <Link href="/">
                <a className="hover:text-gray-300">Home</a>
              </Link>
              <Link href="/projects">
                <a className="hover:text-gray-300">Projects</a>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    )
  }
  export default Header