import { PlusIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
import { Button } from '../ui';
import { Link } from '../ui/link';

export const MainHeader: FC = () => {
  const { status } = useSession();

  return (
    <header className="navbar justify-between bg-default shadow-sm">
      <div className="flex flex-1 justify-start">
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

      <div className="flex justify-center mx-4">
        <Link
          href="/featured"
          className="btn btn-ghost mr-2 flex-0 flex-shrink hidden sm:flex"
        >
          <SparklesIcon className="w-5 h-5" />
          <span className="hidden md:block">Featured Events</span>
        </Link>

        <Link href="/events" className="btn btn-ghost flex-0 flex-shrink">
          All Events
        </Link>
      </div>

      <div className="flex flex-1 justify-end">
        {status === 'authenticated' && (
          <Link
            className="btn btn-primary mr-2 flex-0 flex-shrink"
            href="/event/create"
          >
            <PlusIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:block">Create event</span>
          </Link>
        )}

        {status === 'authenticated' && (
          <Button
            className="btn-ghost flex-0 flex-shrink"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        )}

        {status === 'unauthenticated' && (
          <Button
            className="btn-ghost flex-0 flex-shrink"
            onClick={() => signIn('google')}
          >
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};
