import React, { useState, useMemo, ChangeEvent, useCallback } from 'react';
//@mui
import Scrollbar from '../../../components/scrollbar';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { NavData, NavSubItem } from './navigation/types';


import { SvgIcon } from 'src/components/svg-color';
import ModuleLink from './module-link';
import NoData from '../../../components/no-data';

// ----------------------------------------------------------------------

interface SearchNavItemsProps {
  navData: NavData[]
}

interface FilteredNavData {
  title: string;
  children: NavSubItem[];
}

export default function SearchNavItems({ navData }:SearchNavItemsProps) {

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

  const filterOptions = useCallback((data:FilteredNavData[], searchTerm:string) => {
    const filteredItems:FilteredNavData[] = [];
  
    data.forEach((item) => {
      const matchingModules = item.children.filter(
        (module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module?.path?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingModules.length > 0) {
        filteredItems.push({ ...item, children: matchingModules });
      }
    });
    return filteredItems;
  }, []);

  const newArray = useMemo(() => navData.map((item) => ({
    title: item.title,
    children: item?.children
      .flatMap((module) => {
        if (module?.children) {
          return module.children;
        }
        return module?.path ? module : null;
      })
      .filter((child): child is NavSubItem => child !== null && typeof child === 'object'),
  })), [navData]);

  const filteredData = filterOptions(newArray, filter)

  const noData = !filteredData.length && !!filter

  return (
      <div>
        <IconButton onClick={handleOpen}>
          <SvgIcon icon="ic_search" />
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
                  <SvgIcon
                    icon="ic_search"
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
              {filteredData.map((item:FilteredNavData) => (
                <List key={item.title} sx={{ margin: 0, padding: 0, width: '100%' }}>
                  {item.children.map((module) => (
                    <ModuleLink
                      key={module.title}
                      moduleTitle={module.title}
                      sectionTitle={item.title}
                      path={module.path || ''}
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