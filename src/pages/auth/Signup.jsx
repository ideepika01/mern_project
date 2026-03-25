import React, { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    
    const handleSubmit = () => {
        console.log(formData)
        setFormData({
            email: "",
            fullName: "",
            username: "",
            password: ""
        })
    }

    return (
        <div style={{
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
                <Typography variant="body1" style={{ fontFamily: "Arial", marginTop: "20px" }}>Sign up to see photos and videos from your friends.</Typography>
            </Box>
            <Box>
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginTop: "40px", width: "500px" }}
                />
            </Box>
            <Box>
                <TextField
                    label="Full Name"
                    name="fullName"
                    variant="outlined"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ marginTop: "40px", width: "500px" }}
                />
            </Box>
            <Box>
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ marginTop: "40px", width: "500px" }}
                />
            </Box>
            <Box>
                <TextField
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ marginTop: "40px", width: "500px" }}
                />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ marginTop: "50px", width: "500px", height: "40px", marginBottom: "20px" }}
                >
                    Sign Up
                </Button>
            </Box>
            <Box>
                <Typography variant="body2" style={{ fontFamily: "Arial", fontWeight: "bold" }}>
                    Already have an account? <a href="#">Log in</a>
                </Typography>
            </Box>
        </div>
    )
}

export default Signup
