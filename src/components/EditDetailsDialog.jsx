import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import {useContext, useState} from 'react'
import AuthenticationContext from './context/authentication_context/AuthenticationContext'

const EditDetailsDialog = ({openDialog, setOpenDialog}) => {

  const {userLoginDetails} = useContext(AuthenticationContext)

  const [first_name, setFirstName] = useState(userLoginDetails?.first_name)
  const [last_name, setLastName] = useState(userLoginDetails?.last_name)

  const updateDetails = async ()=>{
    const response = await axios.post('https://api.manxho.co.in/api/users/update_details/', {'first_name':first_name, 'last_name':last_name}, {
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${userLoginDetails?.token}`
      }
    })
    console.log(response)
  }
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
            value={first_name}
            onChange={(e)=>setFirstName(e.target.value)}
            />
             <TextField
            type='text'
            label='Last Name'
            name='lastName'
            margin='normal'
            fullWidth
            value = {last_name}
            onChange={(e)=>setLastName(e.target.value)}
            />
        </DialogContent>

        <DialogActions>
            <Button onClick={updateDetails} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Update</Button>
            <Button onClick={()=>setOpenDialog(false)} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}} >Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default EditDetailsDialog