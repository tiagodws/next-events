import NextLink from 'next/link';
import type { FC, ReactNode } from 'react';

type LinkProps = {
  href?: string;
  className?: string;
  replace?: boolean;
  passHref?: boolean;
  children?: ReactNode;
  isDisabled?: boolean;
};

export const Link: FC<LinkProps> = (props) => {
  const { href, isDisabled, ...rest } = props;

  if (!href || isDisabled) {
    return (
      <div aria-disabled={isDisabled} className={props.className}>
        {props.children}
      </div>
    );
  }

  return <NextLink href={href} {...rest} />;
};
