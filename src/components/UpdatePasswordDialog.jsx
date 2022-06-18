import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import {useContext, useState} from 'react'
import AuthenticationContext from './context/authentication_context/AuthenticationContext'

const UpdatePasswordDialog = ({openUpdateDialog, setOpenUpdateDialog}) => {
  const {userLoginDetails} = useContext(AuthenticationContext)
  const [password,setPassword] = useState()
  const [confirm_password, setConfirmPassword] = useState()

  const updatePassword = async ()=>{
    const response = axios.post('https://api.manxho.co.in/api/users/update_password/', {'password':password, 'confirm_password':confirm_password},{
      headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${userLoginDetails?.token}`
      }
    })
  }

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
            value ={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             <TextField
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            margin='normal'
            fullWidth
            value ={confirm_password}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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