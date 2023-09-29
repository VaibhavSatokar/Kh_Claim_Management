import React from 'react';
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material'

export interface IKhLoaderProps {
}

export function KhLoader (props: IKhLoaderProps) {
  return (
    <React.Fragment>
      <Box 
      component={'div'}
      height={"100vh"}  
      display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'} 
      >
        <CircularProgress
          variant='indeterminate'
          size={50}
          thickness={4} 
        />
      </Box>
    </React.Fragment>
  );
}
