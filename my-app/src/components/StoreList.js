import {React, useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadFile from '@mui/icons-material/UploadFile';
import ModeRounded from '@mui/icons-material/ModeRounded';

import Title from './Title';
import axios from 'axios';

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

export default function StoreList( {getStoreContent}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [csvFile, SetCsvFile] = useState()

  const onSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "fileCSV",
      csvFile
    );

    const url = `http://localhost:8888/fileUpload`;

    axios.post(url, formData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    setLoading(false);
    SetCsvFile(null);
  }

  return (
    <>
      <Title>Lists</Title>
        <div>
          <Button variant="contained" startIcon={<UploadFile />} onClick={handleOpen}> Import</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                <form>
                  <input type="file" name="fileCSV" onChange={e => {
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
        </div>
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
                <TableCell>{row.updated}</TableCell>
                <TableCell align="right">
                  <Link href= {`/store/edit/${row._id}`}>
                    <ModeRounded />
                  </Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
}
