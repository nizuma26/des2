import { Helmet } from 'react-helmet-async';

import Error404 from '../../sections/error/error-404';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Página no encontrada  </title>
      </Helmet>

      <Error404 />
    </>
  );
}
