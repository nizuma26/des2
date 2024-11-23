import { Helmet } from 'react-helmet-async';

import { CreateReceivingOrder } from '../../../sections/procurement/receiving-purchase';

const CreateReceivingOrderPage = () => (
  <>
    <Helmet>
      <title>Crear orden de recepción</title>
    </Helmet>
    <CreateReceivingOrder />
  </>
);

export default CreateReceivingOrderPage
