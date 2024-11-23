import LoadingButton from '@mui/lab/LoadingButton';

import Iconify from '../../../../../components/iconify';

interface ApprovalActionButtonProps {
    onClick: () => void;
    loading: boolean;
    icon?: string;
    title: string;
}

export default function ApprovalActionButton({onClick, loading, icon, title}:ApprovalActionButtonProps) {

    const startIcon= icon ? <Iconify icon={icon} width={18}/> : undefined

  return (
    <LoadingButton
      color="primary"
      loading={loading}
      sx={{ transition: '180ms all' }}
      onClick={() => onClick()}
      startIcon={startIcon}
    >
      {title}
    </LoadingButton>
  );
}
