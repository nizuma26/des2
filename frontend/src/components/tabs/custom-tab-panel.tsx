import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  name: string | number;
  value: any;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, name, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== name}
      id={`simple-tabpanel-${name}`}
      aria-labelledby={`simple-tab-${name}`}
      {...other}
    >
      {value === name && <Box>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;
