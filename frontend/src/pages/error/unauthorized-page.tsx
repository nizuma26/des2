import { Helmet } from 'react-helmet-async';

import { Error403 } from '../../sections/error';

// ----------------------------------------------------------------------

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title> 403 no autorizado </title>
      </Helmet>
      <Error403 />
    </>
  );
}
