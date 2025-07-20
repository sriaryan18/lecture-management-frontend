import Auth from './auth';
import Logo from './logo';

export default function Header() {
  return (
    <div
      className="flex justify-between 
    items-center border-b border-gray-700 p-2
      sticky top-0 z-50 bg-gray-800 mb-2 w-full h-[60px] px-4"
    >
      <Logo />
      <Auth />
    </div>
  );  
}
