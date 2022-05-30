import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import BasicDetails from './StepperDetails/BasicDetails'

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0)

    const handleNext = ()=>{
        if(activeStep < 2){
            setActiveStep((preStep)=>preStep + 1)
        }   
    }
    const handlePrevious = ()=>{
        if(activeStep > 0){
            setActiveStep((preStep)=>preStep - 1)
        }
    }

    const getContent = (step)=>{
       switch(step){
           case 0:
               return (
                   
                   <BasicDetails/>
               );
            default: return 
       }
    }


  return (
   <Container component='main' sx={{minHeight:'100vh', pt:13}}>
        <Box>
           <Typography variant='h3' align='center'>Checkout</Typography>
        </Box>
        <Box>
            <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel>Basic Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Shipping Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Order Details</StepLabel>
                </Step>
            </Stepper>
            <Box component='form' sx={{justifyContent:'center'}}>

                {getContent(activeStep)}
            </Box>
            <Box sx={{mt:4, display:'flex',justifyContent:'flex-end'}}>
                {activeStep > 1 ? (
                    <>
                     <Button onClick={handleNext} sx={{mr:2, bgcolor:'brown', color:'inherit', ":hover":{bgcolor:'brown'}}} variant='contained'>Pay Now</Button>
                    </>
                ): (
                    <>
                    <Button onClick={handleNext} sx={{mr:2,  bgcolor:'brown', color:'inherit', ":hover":{bgcolor:'brown'} }} variant='contained'>Next</Button>
                    </>
                )}
                 
            {activeStep > 0 && (
                 <Button onClick={handlePrevious} variant='outlined' sx={{color:'inherit'}}>Previous</Button>
            )}
            </Box>
            
        </Box>

   </Container>
  )
}

export default Checkout