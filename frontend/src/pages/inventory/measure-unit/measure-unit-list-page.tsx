import { Helmet } from 'react-helmet-async';

import { MeasureUnitList } from '../../../sections/inventory/measure_unit';

// ----------------------------------------------------------------------

export default function ItemCategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Unidades de Medida </title>
      </Helmet>

      <MeasureUnitList />
    </>
  );
}
