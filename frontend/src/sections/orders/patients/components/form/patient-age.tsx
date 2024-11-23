import Box from "@mui/material/Box";

import { useWatch } from "react-hook-form";

import { PatientAgeProps } from "../types";

import { fYear } from "../../../../../utils/format-time";

export function PatientAge({
    control,
  }: PatientAgeProps) {
  
    const birthdate = useWatch({
      name: 'birthdate',
      control,
    });
  
    const date = birthdate
    const age = fYear(date)
  
    return (
      <Box
        width={1}
        display="flex"
        bgcolor="background.neutral"
        p={2}
        borderRadius={1}
        color="text.secondary"
        typography="subtitle2"
        gap={2}
      >
        <Box>
          {birthdate ? `${age[0]} ${age[1]}` : 'Edad'}
        </Box>
      </Box>
    );
  };