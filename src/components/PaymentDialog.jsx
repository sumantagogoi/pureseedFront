import { Button, Dialog, DialogActions, DialogTitle, Box, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import ProductContext from './context/product/productcontext'
import Slide from '@mui/material/Slide';
import UPI from '../assets/Images/upi.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QRCode from 'qrcode.react';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentDialog = () => {
  const { openPaymentModal, setOpenPaymentModal, orderId, orderTotalAmoount, dispatch, setCoupon } = useContext(ProductContext)
  const [qrvalue, setQrValue] = useState('');
  const handleClose = () => {
    setOpenPaymentModal(false)
  }
  const navigate = useNavigate()
  console.log(orderId)
  console.log(orderTotalAmoount)

  const [showBox, setShowBox] = React.useState(false);

  const UseUPI = async () => {
    try {
      const response = await fetch("https://api.manxho.co.in/api/upi_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ order_id: 104 })
      });
      const data = await response.json();
      console.log(data); // Do something with the response data
    } catch (error) {
      console.error(error);
    }
    setShowBox(true);
  }

  const redirecttoPayment = async () => {


    window.location.href = `upi://pay?pa=manxho@icici&pn=Manxho&cu=INR&am=${orderTotalAmoount}&tn=order-${orderId}`
  }

  const generateUPIqrcode = () => {
    let uplink = `upi://pay?pa=manxho@icici&pn=Manxho&cu=INR&am=${orderTotalAmoount}&tn=order-${orderId}`
    setQrValue(uplink)
  }

  const paymentHandler = () => {
    navigate(`/order_detail/${orderId}`)
    toast.success('Thanks For ordering!')
    dispatch({
      type: 'CLEAR_CART'
    })
    setCoupon([])
  }


  return (
    <Dialog
      open={openPaymentModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Select Payment Method:</DialogTitle>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => UseUPI()} size='small' variant='contained' endIcon={<Box component='img' src={UPI} sx={{ width: 40, height: 40, borderRadius: 10, }} />} sx={{ color: '#ffffff', backgroundColor: 'black', ':hover': { bgcolor: 'brown' } }}>Pay With UPI</Button>
        <Button size='small' variant='contained' disabled>Pay With Razorpay</Button>
      </DialogActions>
      {
        showBox && <Box><Typography onClick={() => redirecttoPayment()} sx={{ mt: 2, textAlign: 'center' }}>Click to open UPI APP</Typography>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>Or Scan The code with your UPI App</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
            <QRCode value={`upi://pay?pa=manxho@icici&pn=Manxho&cu=INR&am=${orderTotalAmoount}&tn=order-${orderId}`} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <Button size='large' variant='contained' endIcon={<PriceCheckIcon />} onClick={() => paymentHandler()} >Paid</Button>
          </Box>
          <Box sx={{ margin: 2 }}>
            <Typography>Note:</Typography>
            <Typography>1: Kindly Wait for sometime after making the payment as order confirmation will be done manually.</Typography>
            <Typography>2: Kindly press the button 'PAID' after making the payment</Typography>
          </Box>
        </Box>
      }

    </Dialog>
  )
}

export default PaymentDialog