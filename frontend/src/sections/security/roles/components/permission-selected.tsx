import Label from '../../../../components/label';

interface PermissionSelected {
  selected: number;
}

const PermissionSelected = ({ selected }: PermissionSelected) => {
  return (
    <Label color="primary" sx={{ mt: '2px' }}>
      Seleccionado: {selected}
    </Label>
  );
};

export default PermissionSelected;
