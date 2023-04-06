import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadFile from '@mui/icons-material/UploadFile';
import ModeRounded from '@mui/icons-material/ModeRounded';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import moment from "moment";

import Title from './Title';
import axios from 'axios';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid #f3f3f3',
  boxShadow: 24,
  p: 4,
};

export default function StoreList(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [csvFile, SetCsvFile] = useState()
  const [getStoreContent, setStoreContent] = useState([]);
  const [snackopen, setSnackOpen] = useState(false);
  const [snackdata, setSnackData] = useState({message : '', severity: ''});

  useEffect (() => {
    let url = `http://localhost:8888/liststore`;

    axios.get(url)
    .then(res => setStoreContent(res?.data))
    .catch(err => console.log(err));
  },[]);

  const onSubmit = () => {
    if(!csvFile) {
      setSnackOpen(true);
      setSnackData({"message" : "Please Upload CSV !", "severity" : "warning" })
      return false;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "fileCSV",
      csvFile
    );

    const url = `http://localhost:8888/fileUpload`;

    axios.post(url, formData)
    .then(res => {
      const data = res?.data;
      setStoreContent([...data]);
      setSnackData({"message" : "Successfully Imported !", "severity" : "success" })
      setSnackOpen(true);
    })
    .catch(err => console.log(err))
    .finally(setOpen(false));

    setLoading(false);
    SetCsvFile(null);
  }

  const handleSearch = (e) => {
    let keycode = (e.keyCode ? e.keyCode : e.which);
      if(keycode != '13') {
        return false;
      }

    const url = `http://localhost:8888/searchStore`;
    axios.post(url, {searchText : e.target.value})
    .then(res => {
      const data = res?.data;
      setStoreContent([...data])
    })
    .catch(err => console.log(err))
    .finally(setOpen(false));
  }
  const handleSnackClose = (event, reason) => {
    setSnackOpen(false);
    if (reason === 'clickaway') {
      return;
    }


  };
  return (
    <>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleClose} severity={snackdata.severity} sx={{ width: '100%' }}>
            {snackdata.message}
            </Alert>
        </Snackbar>
        <Title>Lists</Title>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Search" variant="standard" onKeyUp={(e) => handleSearch(e)}/>
                <Button variant="contained" startIcon={<UploadFile />} onClick={handleOpen}> Import</Button>
              </Grid>
            </Grid>

          </Box>
          <Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                  <Box sx={style}>
                    <form>
                      <input type="file" name="fileCSV" required="true" onChange={e => {
                          SetCsvFile(e.target.files[0])
                        }} />

                        <LoadingButton
                          className="primary-btn"
                          variant="contained"
                          color="primary"
                          autoFocus
                          onClick={onSubmit}
                          loading={loading}
                          loadingPosition="end"
                        >
                          Import {loading && <>&nbsp;&nbsp;</>}
                        </LoadingButton>
                    </form>
                  </Box>
              </Modal>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Store Id</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getStoreContent.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.storeId}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.product_name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{moment(row.updated).format("DD-MM-YYYY")}</TableCell>
                  <TableCell align="right">
                    <Link to= {`/store/edit/${row._id}`}>
                      <ModeRounded color='primary'/>
                    </Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

    </>
  );
}
