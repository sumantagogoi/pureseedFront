import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const EditDetailsDialog = ({openDialog, setOpenDialog}) => {
  return (
    <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}
    PaperProps={{
        sx:{
            
        }
    }}
    >
        <DialogTitle>Edit Personal Details</DialogTitle>
        <DialogContent>
            <TextField
            type='text'
            label='First Name'
            name='firstName'
            margin='normal'
            fullWidth
            />
             <TextField
            type='text'
            label='Last Name'
            name='lastName'
            margin='normal'
            fullWidth
            />
        </DialogContent>

        <DialogActions>
            <Button variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Update</Button>
            <Button onClick={()=>setOpenDialog(false)} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}} >Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default EditDetailsDialog