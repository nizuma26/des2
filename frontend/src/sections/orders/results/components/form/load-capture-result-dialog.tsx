import { CaptureResultsDialogProps } from './types';

import { useGetData } from '../../../../../hooks/use-get-data';
import { QUERY_KEYS } from '../../context';

import CaptureResultsDialog from './capture-results-dialog';

import LoadModalSekeleton from '../../../../../components/skeleton/load-modal-skeleton';

import { ResultForm } from '../../../../../types/orders/result';

// -----------------------------------------

type LoadCaptureResultDialogProps = Omit<CaptureResultsDialogProps, 'defaultValues'>;

function LoadCaptureResultDialog({
  orderData,
  labTestData,
}: LoadCaptureResultDialogProps) {
  const { data = [], isFetching } = useGetData({
    url: `api/orders/result/get-parameters/?labtest_id=${labTestData.lab_test_id}`,
    queryKey: [QUERY_KEYS.captureResult, labTestData.lab_test_id],
  });

  const defaulValue: ResultForm = {
    observation: '',
    order: orderData.id,
    status: 'Procesado',
    lab_test: labTestData.lab_test_id,
    result_values: data,
  };

  return (
    <>
      {isFetching ? (
          <LoadModalSekeleton height={500} />
      ) : (
        <CaptureResultsDialog
          orderData={orderData}
          labTestData={labTestData}
          defaultValues={defaulValue}
        />
      )}
    </>
  );
}

export default LoadCaptureResultDialog;
