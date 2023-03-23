import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import {useContext, useState} from 'react'
import { toast } from 'react-toastify'
import AuthenticationContext from './context/authentication_context/AuthenticationContext'

const UpdatePasswordDialog = ({openUpdateDialog, setOpenUpdateDialog}) => {
  const {userLoginDetails} = useContext(AuthenticationContext)
  const [password,setPassword] = useState()
  const [confirm_password, setConfirmPassword] = useState()

  const updatePassword = async ()=>{
    try {
      const response = await axios.post('https://api.pureseed.in/api/users/update_password/', {'password':password, 'confirm_password':confirm_password},{
      headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${userLoginDetails?.token}`
      }
    })
      if (response.request.status === 200){
        toast.success('Password Successfully Updated')
        setOpenUpdateDialog(false)

      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
    
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
            <Button onClick={updatePassword} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Update</Button>
            <Button onClick={()=>setOpenUpdateDialog(false)} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default UpdatePasswordDialog