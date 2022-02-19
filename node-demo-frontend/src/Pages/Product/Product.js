import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, Fab, Snackbar, TextField } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { getProductData, addProductData, setProductModalOpen, deleteProductData, setEditProductData } from './Store/productSliceData';
import AddProductDialog from './AddProductDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

function Product(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState('');
    const [productDataList, setProductDataList] = useState([]);
    const dispatch = useDispatch();
    const { productData } = useSelector(state => state.product)
    const [state, setState] = React.useState({
        openMsg: false,
        vertical: 'top',
        horizontal: 'center',
    });
    useEffect(() => {
        dispatch(getProductData({ id: null }))
    }, [])

    useEffect(() => {
        setProductDataList(productData)
        setProductList(productData)
    }, [productData])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleOpen = () => {
        dispatch(setProductModalOpen())
    };
    let columns = [
        {
            field: 'image_path', headerName: 'Product Image', width: 130, height: 130, renderCell: (params) => (
                <img src={params.value} style={{ height: 100, width: 100 }} />
            ),
        },
        { field: 'title', headerName: 'Name', width: 150 },
        {
            field: 'description', headerName: 'Description', width: 350, renderCell(params) {
                return (
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} title={params.value}>{params.value}</div>
                );
            }
        },
        {
            field: 'id', type: 'actions', headerName: 'Action', width: 150, getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Toggle Admin"
                    onClick={() => {
                        dispatch(setEditProductData({ data: params.row }))
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => {
                        if (window.confirm("Are you sure delete this product?")) {
                            dispatch(deleteProductData({ id: params.id }))
                        }
                    }}
                />,
            ],
        }
    ];
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className='app-bg-color'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Product
                    </Typography>
                    <div className='pull-right' style={{ textAlignLast: 'end', width: '90%' }}>
                        <Fab onClick={handleOpen} className="w-25 mt-2 p-2" variant="extended" size="medium" color="primary" aria-label="add">
                            <Add sx={{ mr: 1 }} />
                            Product
                        </Fab>
                    </div>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <TextField className="w-100" onChange={(e) => {
                    e.preventDefault();
                    console.log(e.target.value);
                    let searchScrnGrp = e.target.value;
                    let searchData = productDataList.filter(
                        (product) =>
                            product.title.toString().toLowerCase().indexOf(searchScrnGrp.toLowerCase()) !==
                            -1
                            ||
                            product.description.toString().toLowerCase().indexOf(searchScrnGrp.toLowerCase()) !==
                            -1
                    );
                    setProductList(searchData)
                }} id="demo-helper-text-misaligned-no-helper" label="Search" />

                <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                    <DataGrid
                        rows={productList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection={false}
                    />
                </div>
            </Box>
            <AddProductDialog />
        </>
    );
}
export default Product;
