import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MuseumRoundedIcon from '@mui/icons-material/MuseumRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";

export default function StoreEdit() {
    const [getContent, setupdatedContent] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect (() => {
        let url = `http://localhost:8888/getstoreDetail/${params?.StoreId}`;
        axios.get(url)
        .then(res => {
            setupdatedContent(res?.data)
        })
        .catch(err => console.log(err));
    },[params?.StoreId]);

    const handleChange = (e, val) => {
        let content = [...getContent];
        content[0][val] = e.target.value;
        setupdatedContent(content);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payloads = {
          sku: data.get('sku'),
          product_name: data.get('product_name'),
          price: data.get('price'),
          updated: moment().format("DD-MM-YYYY hh:mm:ss")
        };

        let url = `http://localhost:8888/updatestore/${getContent[0]._id}`;

        axios.post(url, payloads)
        .then(res => {
            const data = res?.data;
            setupdatedContent([...data]);
            navigate(`/`);
            }
        )
        .catch(err => console.log(err));

      };

      return (
        <>
        { getContent.length > 0 && (
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
                    Store ID - {getContent[0].storeId}
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
                        label="SKU"
                        value={getContent[0].sku}
                        defaultValue={getContent[0].sku}
                        onChange={(e) => {handleChange(e, 'sku')}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="product_name"
                        name="product_name"
                        autoComplete="product_name"
                        label="Product Name"
                        defaultValue={getContent[0].product_name}
                        value={getContent[0].product_name}
                        onChange={(e) => {handleChange(e, 'product_name')}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="price"
                        type="price"
                        id="price"
                        label="Price"
                        autoComplete="Price"
                        defaultValue={getContent[0].price}
                        value={getContent[0].price}
                        onChange={(e) => {handleChange(e, 'price')}}
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
                    <Link
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    to={`/`}
                    >
                    Cancel
                    </Link>
                    <Grid container justifyContent="flex-end">
                    </Grid>
                </Box>
                </Box>

            </Container>
        )}
        </>

      )
}