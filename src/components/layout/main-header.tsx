import Link from 'next/link';
import { FC } from 'react';

export const MainHeader: FC = (props) => {
  return (
    <header className="navbar bg-default shadow-sm">
      <div className="flex-none">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          NextEvents
        </Link>
      </div>

      <div className="flex-1 justify-center"></div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
