import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* A link inside a sentence: the same ink as the words around it, marked by a
   fine underline that darkens on hover. Internal routes, external URLs, or —
   with neither — just the underlined name. */
export function TextLink({ children, to, href }: { children: ReactNode; to?: string; href?: string }) {
  if (to) {
    return (
      <Link to={to} className="text-link">
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className="text-link" target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return <span className="text-link text-link--static">{children}</span>;
}
