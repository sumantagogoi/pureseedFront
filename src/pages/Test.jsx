import { Container } from '@mui/material'
import React from 'react'
import TestingCategory from '../components/TestingCetegory'
import SomeMenu from '../components/SomeMenu'

const Test = () => {
  return (
    <Container sx={{pt:3, minHeight:'100vh'}}>
        <TestingCategory/>
        
    </Container>
  )
}

export default Test