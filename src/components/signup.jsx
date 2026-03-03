import React from "react"
import { Box, Typography, TextField, Button } from "@mui/material"

function signup() {
    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",



    }}>
        <Box>
            <Typography variant="h4" style={{ fontFamily: "Billabong", fontWeight: "bold" }}>Instagram</Typography>
        </Box>
        <Box>
            <Typography variants="p" style={{ fontFamily: "Arial", marginTop: "20px" }}>Sign up to see photos and videos from your friends.</Typography>
        </Box>
        <Box>
            <TextField label="Email" variant="outlined" style={{ marginTop: "40px", width: "500px", height: "30px" }} />
        </Box>
        <Box>
            <TextField label="Full Name" variant="outlined" style={{ marginTop: "40px", width: "500px", height: "30px" }} />
        </Box>
        <Box>
            <TextField label="Username" variant="outlined" style={{ marginTop: "40px", width: "500px", height: "30px" }} />
        </Box>
        <Box>
            <TextField label="Password" variant="outlined" style={{ marginTop: "40px", width: "500px", height: "30px" }} />
        </Box>
        <Box>
            <Button variant="contained" style={{ marginTop: "50px", width: "500px", height: "40px", marginBottom: "20px" }}>Sign Up</Button>
        </Box>
        <Box>
            <Typography variant="p" style={{ fontFamily: "Arial", fontWeight: "bold" }}>Already have an account? <a href="#">Log in</a></Typography>
        </Box></div>
    )
}
export default signup