import { useState, useMemo, ChangeEvent } from 'react';
//@mui
import Scrollbar from '../../../components/scrollbar';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../../components/iconify';
import NoData from '../../../components/no-data';

import ModuleLink from './module-link';

import { navConfig } from '../config-navigation';

// ----------------------------------------------------------------------

export default function SearchNavItems() {

  const [open, setOpen] = useState(false);

  const [filter, setFilter] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFilter('');
  };

  const onFilterData = (e:ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

  const filterOptions = (data:any, searchTerm:string) => {
    const filteredItems:Array<string> = [];
  
    data.forEach((item:any) => {
      const matchingModules = item.modules.filter(
        (module:any) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module.path.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingModules.length > 0) {
        filteredItems.push({ ...item, modules: matchingModules });
      }
    });
    return filteredItems;
  };

  const newArray = useMemo(() => navConfig.map((item) => ({
    ...item,
    modules: item.children
      .flatMap((module) => {
        if (module.children) {
          return module.children;
        }
        return module.path ? module : null;
      })
      .filter(Boolean),
  })), [navConfig]);

  const filteredData = filterOptions(newArray, filter)

  const noData = !filteredData.length && !!filter

  return (
      <div>
        <IconButton onClick={handleOpen}>
          <Iconify icon="eva:search-fill" width={20}/>
        </IconButton>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            '& .MuiDialog-paper': {
              height: '60%',
              width: '100%',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'background.transparent.popover',
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
            <OutlinedInput
              value={filter}
              onChange={onFilterData}
              placeholder="Buscar..."
              fullWidth
              sx={{
                fontSize: 16,
                fontWeight: 'fontWeightMedium',
                border: 0,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    width={20}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
          </DialogTitle>

          <DialogContent dividers sx={{ px: 0 }}>
            <Scrollbar
              sx={{
                px: '20px',
                py: '3px',
                '& .simplebar-content': {
                  flexDirection: 'column',
                  marginLeft: 0,
                },
              }}
            >
              {filteredData.map((item:any) => (
                <List key={item.title} sx={{ margin: 0, padding: 0, width: '100%' }}>
                  {item.modules.map((module:any) => (
                    <ModuleLink
                      key={module.title}
                      moduleTitle={module.title}
                      sectionTitle={item.title}
                      path={module.path}
                      handleClose={handleClose}
                    />
                  ))}
                </List>
              ))}              
              {noData && <NoData query={filter}/>}
            </Scrollbar>
          </DialogContent>
        </Dialog>
      </div>
  );
}