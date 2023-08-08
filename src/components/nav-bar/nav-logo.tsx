import { type FC } from 'react';
import { Link } from '../ui/link';

export const NavLogo: FC = () => {
  return (
    <div className="flex">
      <Link
        href="/"
        className="btn btn-ghost text-primary normal-case text-xl flex-0 flex-shrink hidden md:flex"
      >
        NextEvents
      </Link>

      <Link
        href="/"
        className="btn btn-ghost text-primary upper-case flex-0 flex-shrink text-xl display md:hidden"
      >
        NE
      </Link>
    </div>
  );
};
