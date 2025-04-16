import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="/assets/Group 4394.png"
          alt="Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </div>
      <div className="text-gray-600 font-semibold">
        Texto da Direita
      </div>
    </nav>
  );
}