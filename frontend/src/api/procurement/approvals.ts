import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { ApprovalRequisitionValues } from '../../types/procurements/approvals';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const approvePurchaseRequisition = async (data: ApprovalRequisitionValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('approval_date', dayjs(data.approval_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.post('api/approval/approve-requisition/', formData);
  return response.data;
};
