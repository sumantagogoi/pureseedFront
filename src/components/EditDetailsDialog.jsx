import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import {useContext, useState} from 'react'
import AuthenticationContext from './context/authentication_context/AuthenticationContext'

const EditDetailsDialog = ({openDialog, setOpenDialog}) => {

  const {userLoginDetails, dispatch, profile} = useContext(AuthenticationContext)

  const [first_name, setFirstName] = useState(profile?.first_name)
  const [last_name, setLastName] = useState(profile?.last_name)

  const updateDetails = async ()=>{
    const response = await axios.post('https://api.manxho.co.in/api/users/update_details/', {'first_name':first_name, 'last_name':last_name}, {
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${userLoginDetails?.access_token}`
      }
    })
    
    if(response.request.status=== 200){
      // const latestUserInfo = JSON.parse(localStorage.getItem('userLoginDetails'))

      dispatch({
        type:'GET_PROFILE',
        payload:response.data
      })
    
    // const first_name = response?.data?.first_name
    // const last_name = response?.data?.last_name
    // const newUserDetails = {
    //   ...latestUserInfo, first_name, last_name,
    // }
    // const stateData = localStorage.setItem('userLoginDetails', JSON.stringify(newUserDetails))
    // dispatch({
    //   type:'USER_LOGIN',
    //   payload:newUserDetails
    // })
    setOpenDialog(false)
    }  
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