import CrusherWeightmentForm from '@/src/components/Crusher-form/CrusherWeightmentForm'
import { Box } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Box className="p-4">
      <h1 className='text-3xl font-semibold text-center mt-4'>CRUSHER WEIGHTMENT FORM</h1>
    <CrusherWeightmentForm />
    </Box>
  )
}

export default Home