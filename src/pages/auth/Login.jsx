import React from 'react'

import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
function Login() {
    return (
        <div className='login-container' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",



        }}>

            <Box>
                <Typography variant='h4' style={{ fontFamily: "Billabong", fontWeight: "bold" }}>Instagram</Typography>
            </Box>
            <Box>
                <TextField label="Username" variant="outlined" style={{ marginTop: "40px", width: "400px", height: "30px" }} />
            </Box>
            <Box>
                <TextField label="Password" variant="outlined" style={{ marginTop: "50px", width: "400px", height: "30px" }} />
            </Box>
            <Box>
                <Button variant="contained" style={{ marginTop: "60px", width: "400px", marginBottom: "30px", height: "50px" }}>Log In</Button>
            </Box>
            <Box>
                <Typography variant='p' style={{
                    marginBottom: "20px"

                }}>Forgot your login details?<b> Get help logging in.</b></Typography>
            </Box>

            {/* input
            password
            button
            forgot password
            sign up */}









            {/* <h1>Instagram</h1>
        
            <input className='login-input' type='text' placeholder='Phone number, email or username' style={{
                height: "40px", width:
                    "300px"
            }} /><br />
            <input className='login-password' type='password' placeholder="Password" style={{
                height: "40px", width:
                    "300px"
            }} /><br />
            <button className='login-button' type="submit" style={{
                height: "40px", marginTop
                    : "10px", width:
                    "300px", backgroundColor: "blue", color: "white"
            }}>Log In</button>
            <p>Forgot your login details?<b>Get help logging in.</b></p> */}

        </div>
    )
}


export default Login