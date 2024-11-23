import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

interface PermissionListItem {
  handleToggle: (id: number) => void;
  id: number;
  name: string;
  selected: number[];
}

function PermissionListItem({ id, name, selected, handleToggle }: PermissionListItem) {
  return (
    <ListItem
      disablePadding
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 1,
      }}
    >
        <ListItemButton
          role={undefined}
          onClick={() => handleToggle(id)}
          sx={{ width: 1 }}
          dense
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <Checkbox
              edge="start"
              checked={selected.indexOf(id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${id}` }}
            />
          </ListItemIcon>
          <ListItemText id={`checkbox-list-label-${id}`} primary={name} />
        </ListItemButton>
    </ListItem>
  );
}

export default PermissionListItem;
