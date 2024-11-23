import { Helmet } from 'react-helmet-async';

import LabTestCategoryList from '../../../sections/configuration/lab-test-categories';

// ----------------------------------------------------------------------

export default function LabTestCategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Catálogo de categorías </title>
      </Helmet>

      <LabTestCategoryList />
    </>
  );
}
