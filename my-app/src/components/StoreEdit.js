import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MuseumRoundedIcon from '@mui/icons-material/MuseumRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function StoreEdit() {
    const params = useParams();
    const [getContent, setContent] = useState([]);

    useEffect (() => {
        let url = `http://localhost:8888/getstoreDetail/${params?.StoreId}`;

        axios.get(url)
        .then(res => setContent(res?.data))
        .catch(err => console.log(err));
      },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payloads = {
          sku: data.get('sku'),
          product_name: data.get('product_name'),
          price: data.get('price'),
        };

        let url = `http://localhost:8888/updatestore/${params?.StoreId}`;

        axios.post(url, payloads)
        .then(res => setContent(res?.data))
        .catch(err => console.log(err));

      };

      return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <MuseumRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Store  #{getContent[0]._id}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="sku"
                        name="sku"
                        autoComplete="family-name"
                        value={getContent[0].sku}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="product_name"
                        name="product_name"
                        autoComplete="product_name"
                        value={getContent[0].product_name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="price"
                        type="price"
                        id="price"
                        autoComplete="Price"
                        value={getContent[0].price}
                        />
                    </Grid>

                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Update
                    </Button>
                    <Grid container justifyContent="flex-end">
                    </Grid>
                </Box>
                </Box>

            </Container>
        </>
      )
}