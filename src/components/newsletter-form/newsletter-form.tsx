import { FC, useState } from 'react';

export const NewsletterForm: FC = () => {
  const [email, setEmail] = useState('');

  return (
    <form className="flex flex-col items-center">
      <h4 className="prose mb-2">Subscribe to stay up-to-date!</h4>
      <div className="join">
        <input
          id="email"
          className="input input-bordered join-item"
          placeholder="Email"
        />

        <button className="btn join-item" type="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
};
