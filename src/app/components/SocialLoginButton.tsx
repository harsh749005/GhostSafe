import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';
import { BsMicrosoft } from 'react-icons/bs';
import { SiHasura } from 'react-icons/si';

type SocialLoginButtonProps = {
  provider: 'Google' | 'GitHub' | 'Microsoft' | 'Hasura';
  icon: 'google' | 'github' | 'microsoft' | 'hasura';
  isLast?: boolean;
};

const SocialLoginButton = ({ provider, icon, isLast = false }: SocialLoginButtonProps) => {
  const icons = {
    google: <FcGoogle className="w-5 h-5" />,
    github: <VscGithub className="w-5 h-5 text-white" />,
    microsoft: <BsMicrosoft className="w-4 h-4 text-white" />,
    hasura: <SiHasura className="w-4 h-4 text-white" />,
  };

  return (
    <button
      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border border-gray-700 
        ${isLast ? 'relative' : ''}
      `}
      type="button"
      aria-label={`Sign in with ${provider}`}
    >
      {icons[icon]}
      <span className="text-gray-200 font-medium">{provider}</span>
      {isLast && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-sm">
          LAST
        </span>
      )}
    </button>
  );
};

export default SocialLoginButton;