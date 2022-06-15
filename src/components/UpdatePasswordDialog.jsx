import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const UpdatePasswordDialog = ({openUpdateDialog, setOpenUpdateDialog}) => {
  return (
    <Dialog open={openUpdateDialog} onClose={()=>setOpenUpdateDialog(false)}>
        <DialogTitle>Edit Personal Details</DialogTitle>
        <DialogContent>
            <TextField
            type='password'
            label='Password'
            name='password'
            margin='normal'
            fullWidth
            />
             <TextField
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            margin='normal'
            fullWidth
            />
        </DialogContent>

        <DialogActions>
            <Button variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Update</Button>
            <Button onClick={()=>setOpenUpdateDialog(false)} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default UpdatePasswordDialog