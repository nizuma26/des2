import { forwardRef, Ref } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

interface RouterLinkProps {
  href: string;
}

const RouterLink = forwardRef(({ href, ...other } : RouterLinkProps, ref:Ref<HTMLAnchorElement>) => <Link ref={ref} to={href} {...other} />);

export default RouterLink;
