import { Database } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-md bg-teal-500 bg-opacity-20">
      <Database className="w-8 h-8 text-teal-400" />
    </div>
  );
};

export default Logo;