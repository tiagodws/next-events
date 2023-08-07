import { PlusIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
import { Button } from '../ui';
import { Link } from '../ui/link';

export const MainHeader: FC = () => {
  const { status } = useSession();

  return (
    <header className="navbar bg-default shadow-sm">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost text-primary normal-case text-xl hidden md:flex"
        >
          NextEvents
        </Link>

        <Link
          href="/"
          className="btn btn-ghost text-primary upper-case text-xl display md:hidden"
        >
          NE
        </Link>
      </div>

      <div className="navbar-center overflow-hidden min-w-0">
        <Link href="/featured" className="btn btn-ghost mr-2">
          <SparklesIcon className="w-5 h-5" />
          <span className="hidden sm:block">Featured Events</span>
        </Link>

        <Link href="/events" className="btn btn-ghost">
          All Events
        </Link>
      </div>

      <div className="navbar-end">
        {status === 'authenticated' && (
          <Link className="btn btn-primary mr-2" href="/event/create">
            <PlusIcon className="w-5 h-5" />
            <span className="hidden sm:block">Create event</span>
          </Link>
        )}

        {status === 'authenticated' && (
          <Button className="btn-ghost" onClick={() => signOut()}>
            Sign out
          </Button>
        )}

        {status === 'unauthenticated' && (
          <Button className="btn-ghost" onClick={() => signIn('google')}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};
