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
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          NextEvents
        </Link>
      </div>

      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-primary mr-2">
          Featured Events
          <SparklesIcon className="w-5 h-5 text-primary" />
        </Link>

        <Link href="/events" className="btn btn-ghost">
          All Events
        </Link>
      </div>

      <div className="navbar-end">
        {status === 'authenticated' && (
          <Link className="btn btn-primary mr-2" href="/event/create">
            Create event
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
