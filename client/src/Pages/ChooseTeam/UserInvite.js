import React, { useState, useRef } from "react";
import { IconButton, Avatar, CircularProgress, Stack, Grid, TextField, Card, Chip , Paper, Link, Box, Button, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material/"; 

import { useAuth, usePlayingTeam } from '../../Context';
import { profile } from '../../Images';
import { Axios, deepCopy  } from '../../Api';
import { DatabaseRequest } from '../../Classes';

export default function UserInvite ({userArray, setUserArray, playingTeam, setPlayingTeam}) {
    const emailRef = useRef( );
    const { auth, setAuth } = useAuth( );
return(<>
<Grid container sx={{mb: 1,pl: '3px',}}>
    <Grid item xs='1' sm='1'> 
        <Avatar src={profile} sx={{ backgroundColor: "#faae1c", mt: {xs: 0, sm: 3} , ml: {xs: '-3px', sm: 0} , width:  '32px ! important' , height: '32px ! important' }} />
    </Grid>
    
    <Grid item xs='9' sm='10' sx={{pl: '3px'}}>
         {/* <Typography variant="h4" sx={{textAlign: 'left', m:3}}>Email</Typography>  */}

        <TextField inputRef = {emailRef} autoFocus autoComplete="email" label="Set Member Email" margin="normal" fullWidth />

    </Grid>
    <Grid item xs='1' sm='1' sx={{zIndex: 1}}>
    <Box sx={{mt: {xs: 5, sm: 3 }, ml: {xs: -2, sm: 0 }}}>
        <IconButton onClick={()=>{ 
         
            
            handleUserAdd(playingTeam, setPlayingTeam, auth, setAuth, emailRef, userArray, setUserArray)

        }}>
            <Icons.Add sx={{ fontSize: '30pt'}} />
        </IconButton>
    </Box> 
    
    </Grid>

</Grid>
</>);
}


const handleUserAdd = (playingTeam, setPlayingTeam, auth, setAuth, emailRef, userArray, setUserArray, setErrMsg, ) => {
    //previous checker for array
    const email = emailRef.current.value;
    if(email.trim() === '' || email.trim() === auth.email || userArray.filter((x) => x.email === email.trim()).length !== 0  ) return;
    const playingTeamId = playingTeam._id;
    const playerEmail = email;
    const data = {playingTeamId, playerEmail};
    new DatabaseRequest( () => Axios('PATCH', '/api/playingTeam', data, {}) )
        .GoodResult( (result) => {
            const array = (result.players).filter((x) => x.email !== auth.email);
            setUserArray(array); 
            emailRef.current.value = '';
            emailRef.current.focus();
        } )
        .BadResult( (error) => { alert(error); } )
        .Build();  
    };