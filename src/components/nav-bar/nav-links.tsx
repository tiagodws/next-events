import { SparklesIcon } from '@heroicons/react/24/solid';
import { type FC } from 'react';
import { Link } from '../ui/link';

export const NavLinks: FC = () => {
  return (
    <div className="flex">
      <Link
        href="/featured"
        className="btn btn-ghost mr-2 flex-0 flex-shrink hidden md:flex"
      >
        <SparklesIcon className="w-5 h-5" />
        <span className="hidden md:block">Featured Events</span>
      </Link>

      <Link href="/events" className="btn btn-ghost flex-0 flex-shrink">
        All Events
      </Link>
    </div>
  );
};
