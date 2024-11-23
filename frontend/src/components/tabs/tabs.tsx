import { ReactNode, SyntheticEvent } from 'react';
//@mui
import { Tabs as MuiTabs, TabsProps } from '@mui/material';
import Tab from '@mui/material/Tab';

interface TabOptions {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

interface CustomTabsProps {
  options: TabOptions[];
  value: any;
  onChange: (event: SyntheticEvent, value: any) => void;
  tabsSlot?: TabsProps;
}

export default function Tabs({ options, value, onChange, tabsSlot }:CustomTabsProps) {

  return (
    <MuiTabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{ boxShadow: 'rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset', px: 2 }}
      aria-label="scrollable auto tabs example"
      {...tabsSlot}
    >
        {options?.map((op)=> (
            <Tab key={op.value} label={op.label} value={op.value} />
        ))}
    </MuiTabs>
  );
}
