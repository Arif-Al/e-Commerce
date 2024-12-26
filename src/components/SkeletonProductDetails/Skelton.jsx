import { Box } from '@mui/material'
import React from 'react'
import Skeleton from '@mui/material/Skeleton';
const Skelton = () => {
  return (
    <>
    <Box className="row align-items-center my-5">
        <Box className="col-12 col-md-6">
        <Skeleton variant="rounded" width={300} height={400} />
        </Box>
        <Box  className="col-12 col-md-6">
        <Skeleton variant="text"  width={150} height={30} />
        <Skeleton variant="text"  width={600} height={60} />
        <Skeleton variant="text"  width={670} height={150} />
        <Skeleton variant="text"  width={180} height={40} />
        <Box className="d-flex">
        <Skeleton variant="text"  width={180} height={40} />
        <Skeleton variant="rounded" sx={{marginLeft:"50%"}} width={170} height={40} />
        </Box>
        </Box>
    </Box>
    
    
    
    
    
    
    
    </>
  )
}

export default Skelton