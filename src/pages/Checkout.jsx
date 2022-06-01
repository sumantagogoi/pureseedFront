import { Box, Button, Container, Grid, MenuItem, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../components/context/product/productcontext'

const Checkout = () => {


    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] =useState('')
    const [address, setAddress] = useState('') 
    const [city, setCity] = useState('') 
    const [state, setState] = useState('')  
    const [zipcode, setZipcode] = useState('')
    const [country, setCountry] = useState('India')

    const {addShippingDetails} = useContext(ProductContext)
    

    const onSubmitHandler=(e)=>{
        e.preventDefault()
        addShippingDetails({firstName, lastName, address, city, state, zipcode, country})
        navigate('/order_review')
    }


  return (
   <Container component='main' sx={{minHeight:'100vh', maxWidth:'sm',pt:13}}>
       <Box>
           <Typography variant='h3' align='center'>Shipping Details</Typography>
       </Box>
       <Box component='form' onSubmit={onSubmitHandler} sx={{pb:4}}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                id='firstName'
                name='firstName'
                label= 'First Name'
                margin='normal'
                fullWidth
                required
                value = {firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                />
                
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                id='lastName'
                name='lastName'
                label= 'Last Name'
                margin='normal'
                fullWidth
                required
                value = {lastName}
                onChange={(e)=>setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                id='Address'
                name='address'
                label='Address'
                fullWidth
                margin='normal'
                multiline
                rows={4}
                required
                value = {address}
                onChange={(e)=>setAddress(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='city'
                name='city'
                label='City'
                fullWidth
                margin='normal'
                required
                value = {city}
                onChange={(e)=>setCity(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='state'
                name='state'
                label='State'
                fullWidth
                margin='normal'
                required
                value = {state}
                onChange={(e)=>setState(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='zipcode'
                name='zipcode'
                label='Zipcode'
                fullWidth
                margin='normal'
                required
                value = {zipcode}
                onChange={(e)=>setZipcode(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                id='country'
                name='country'
                label='Country'
                fullWidth
                margin='normal'
                value={country}
                onChange={(e)=>setCountry(e.target.value)}

                />
            </Grid>
        </Grid>
        <Button type='submit' fullWidth variant='outlined'sx={{mt:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Next</Button>
        </Box>
   </Container>
  )
}

export default Checkout