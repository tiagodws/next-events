import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

type LinkProps = {
  href?: string;
  className?: string;
  activeClassName?: string;
  replace?: boolean;
  passHref?: boolean;
  children?: ReactNode;
  isDisabled?: boolean;
};

export const Link: FC<LinkProps> = (props) => {
  const {
    href,
    isDisabled,
    className,
    activeClassName = 'text-primary',
    ...rest
  } = props;
  const pathname = usePathname();
  const isActive = href && pathname?.startsWith(href);
  const activeClass = isActive ? activeClassName : '';

  if (!href || isDisabled) {
    return (
      <div
        aria-disabled={isDisabled}
        className={`normal-case ${className} ${activeClass}`}
      >
        {props.children}
      </div>
    );
  }

  return (
    <NextLink
      href={href}
      className={`normal-case ${className} ${activeClass}`}
      {...rest}
    />
  );
};
