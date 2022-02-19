import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/DashboardCustomizeSharp';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, Fab, Snackbar, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { getProductData, addProductData, setProductModalClose, editOneProductData } from './Store/productSliceData';
import { setSnackBarErrorMessage } from '../../Components/Store/SnackBarSliceData';

const drawerWidth = 240;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: 'Product Image', width: 130 },
    { field: 'title', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     // sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Targa', firstName: 'Daenerys', age: null },
    { id: 11, lastName: 'Sandre', firstName: 'Sandre', age: 150 },
    { id: 12, lastName: 'Ford', firstName: 'Ferrara', age: 44 },
    { id: 13, lastName: 'Nces', firstName: 'Rossini', age: 36 },
    { id: 14, lastName: 'Rox', firstName: 'Harvey', age: 65 },
];

function AddProductDialog(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/jpeg,image/png,image/jpg', multiple: false });
    const dispatch = useDispatch();
    const { productData, productModal, editProductData } = useSelector(state => state.product)

    useEffect(() => {
        setTitle('')
        setDescription('')
        setImageData([])
    }, [])

    useEffect(() => {
        setTitle(editProductData?.title ? editProductData?.title : '')
        setDescription(editProductData?.description ? editProductData?.description : '')
    }, [editProductData])

    useEffect(() => {
        setImageData(acceptedFiles[0])
    }, [acceptedFiles])

    const handleClose = () => dispatch(setProductModalClose());
    const files = acceptedFiles.map(file => (
        <a key={Math.random()}>
            {file.path}
        </a>
    ));

    const onSubmit = () => {
        if (title === "") {
            dispatch(setSnackBarErrorMessage({ message: "Title is requied!" }))
        } else if (description === "") {
            dispatch(setSnackBarErrorMessage({ message: "Description is requied!" }))
        } else if (!(editProductData && editProductData.length !== 0) && !imageData) {
            dispatch(setSnackBarErrorMessage({ message: "Image is requied!" }))
        } else {
            let formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)

            if (editProductData && editProductData.length !== 0) {
                if (imageData) {
                    formData.append("image", imageData)
                }
                formData.append("id", editProductData.id)
                dispatch(editOneProductData({ payload: formData }))
            } else {
                formData.append("image", imageData)
                dispatch(addProductData({ payload: formData }))
            }
        }
    }

    return (
        <>
            <Modal
                open={productModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ color: 'primary.main' }} variant="h5" component="h2">
                        {(editProductData && editProductData.length !== 0) ? 'Edit Product' : 'Add Product'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            className="w-100"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField className="w-100" value={title} onChange={(e) => setTitle(e.target.value)} id="demo-helper-text-misaligned-no-helper" label="Title*" />
                        </Box>
                        <Box
                            className="w-100"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField className="w-100" multiline
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="demo-helper-text-misaligned-no-helper" label="Description*" />
                        </Box>
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} accept={'image/*'} multiple={false} />
                                <p>Drag and drop product image here, or click to select image file</p>
                            </div>
                            <aside>
                                <h6>Files</h6>
                                <ul>{files}</ul>
                            </aside>
                        </section>
                        <Fab onClick={() => { onSubmit() }} className="w-100 mt-2 p-2" variant="extended" size="medium" color="success" aria-label="add">
                            Submit
                        </Fab>
                    </Typography>
                    <div onClick={handleClose} className="closeModalBtn">
                        <CloseIcon />
                    </div>
                </Box>
            </Modal>
        </>
    );
}
export default AddProductDialog;
