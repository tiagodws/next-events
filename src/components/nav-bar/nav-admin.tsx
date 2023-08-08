import { PlusIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { type FC } from 'react';
import { Button } from '../ui';
import { Link } from '../ui/link';

export const NavAdmin: FC = () => {
  const { status } = useSession();

  return (
    <div className="flex">
      {status === 'authenticated' && (
        <Link
          className="btn btn-primary mr-2 flex-0 flex-shrink"
          href="/event/create"
          shouldStyleActive={false}
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
  );
};
