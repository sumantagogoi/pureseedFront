import { Grid, TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';


const ShippingDetails = () => {
  return (
   <>
   <Grid container spacing={2}>
       <Grid item xs={12} sm={12} md={12}>
           <TextField
           id='address'
           name='address'
           label='Address'
           fullWidth
           margin='normal'
           />
       </Grid>
       <Grid item xs={12} sm={6}>
            <TextField
            id='city'
            name='city'
            label ='City'
            fullWidth
            margin='normal'

            />
       </Grid>
       <Grid item xs={12} sm={6}>
          <TextField id='state' label='State' select fullWidth margin='normal'>
                <MenuItem>Assam</MenuItem>
          </TextField>
       </Grid>

   </Grid>
   </>
  )
}

export default ShippingDetails