import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {CssBaseline, MenuItem, Select, TextField, FormControl, InputLabel} from "@mui/material";
import {USSTATES} from "@/static_data/stateList";
import React, {useState} from "react";

export default function CustomerCreationForm() {

const USStates = USSTATES;

const [usState, setUsState] = useState('');
const handleChange = (event: { target: { value: string; }; }) => {
    setUsState(event.target.value as string);
}


    return (
            <Box
                //component="form"
                sx={{flexGrow: 1}}>
                <FormControl fullWidth>
                    <h1><b>THIS IS STRAIGHT OUTA COMPONENTS</b></h1>
                    <CssBaseline/>
                    <Container maxWidth="sm">
                        <TextField
                            //CUSTOMER NAME//
                            name={'customerName'}
                            fullWidth
                            required
                            id="customerName"
                            label="Customer Name"
                            margin={'dense'}
                        />
                        <TextField
                            //CUSTOMER PHONE//
                            type={'number'}
                            sx={{
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                            inputMode={'tel'}
                            name={'customerPhone'}
                            fullWidth
                            required
                            id="customerPhone"
                            label="Phone Number"
                            margin={'dense'}
                        />
                        <TextField
                            //CUSTOMER EMAIL//
                            name={'customerEmail'}
                            fullWidth
                            required
                            id='standard-email'
                            label="Email"
                            type='email'
                            margin={'dense'}
                        />
                        <TextField
                            //CUSTOMER ADDRESS//
                            name={'customerAddressOne'}
                            fullWidth
                            required
                            id='address1'
                            label="Address 1"
                            margin={'dense'}
                        />
                        <TextField
                            //CUSTOMER ADDRESS2//
                            name={'customerAddressTwo'}
                            fullWidth
                            required
                            id='address2'
                            label="Address 2"
                            margin={'dense'}
                        />
                        <TextField
                            //CUSTOMER CITY//
                            name={'customerCity'}
                            fullWidth
                            required
                            id='City'
                            label="City"
                            margin={'dense'}
                        />
                        <InputLabel id='USStateSelect'>Label</InputLabel>
                        <TextField
                            //CUSTOMER STATE//
                            name={'customerState'}
                            style={{ width: "100%" }}
                            variant="outlined"
                            value={usState}
                            onChange={handleChange}
                            select
                            label="State"
                            margin={'dense'}
                        >
                            {USStates.map((usState) => (
                                <MenuItem
                                    key={usState.abbreviation}
                                    value={usState.abbreviation}>
                                    {usState.name}
                                </MenuItem>
                            ))}
                        </TextField>


{/*                        <Select
                            //CUSTOMER STATE//
                            fullWidth={true}

                            labelId="USStateSelect"
                            label={'Label'}
                            value={usState}
                            id="stateSelect"
                            margin={'dense'}
                            onChange={handleChange}
                            variant={'outlined'}

                        >
                            {USStates.map((usState) => (
                                <MenuItem
                                    key={usState.abbreviation}
                                    value={usState.abbreviation}>
                                    {usState.name}
                                </MenuItem>
                            ))}
                        </Select>
                */}
                        <TextField
                            //CUSTOMER PHONE//

                            type={'number'}
                            sx={{
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                            inputMode={'numeric'}
                            name={'customerZip'}
                            fullWidth
                            required
                            id="zipcode"
                            label="Zipcode"
                            margin={'dense'}
                        />



                        <Button variant="contained">Create Customer</Button>
                    </Container>
                </FormControl>
            </Box>
    )
}