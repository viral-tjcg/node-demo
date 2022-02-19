import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Fab from '@mui/material/Fab';
import { useHistory, Link } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { loginAPI, loginSuccessChange } from './Store/loginSliceData';
import ConstantHelper from '../../Helper/ConstantHelper';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {

    const appRef = useRef();
    const history = useHistory()
    const { loginSuccess } = useSelector(state => state.login)
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });
    const setDimension = () => {
        getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight
        })
    }
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
    };
    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            history.push('/app')
        }
    }, [])

    useEffect(() => {
        if (loginSuccess === true) {
            localStorage.setItem('isLogin', true)
            dispatch(loginSuccessChange(false))
            history.push('/app')
        }
    }, [loginSuccess])


    useEffect(() => {
        window.addEventListener('resize', setDimension);
        return (() => {
            window.removeEventListener('resize', setDimension);
        })
    }, [screenSize])

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setPassword(event.target.value)
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signUpAPI = () => {
        if (email === "") {
            setErrorMsg("Email is requied!  ")
            setState({ open: true, vertical: 'top', horizontal: 'center' });
        }
        else if (password === "") {
            setErrorMsg("Password is requied!  ")
            setState({ open: true, vertical: 'top', horizontal: 'center' });
        } else {
            let formData = {
                name: email,
                password
            }
            dispatch(loginAPI({ payload: formData }))
        }
    }

    return (
        <><Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
        >
            <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
            <div ref={appRef} style={{ backgroundImage: `url("/assets/images/loginBg2x.png")`, backgroundSize: 'cover', height: screenSize.dynamicHeight }}>
                <div className='col-sm-12 row' style={{ margin: 0 }}>
                    <div className='col-sm-9 align-self-center' style={{ textAlign: '-webkit-center' }}>
                        <img src='/logo512.png' style={{ height: 200, width: 200 }} />
                    </div>
                    <div className='col-sm-3 bg-white' style={{ height: window.innerHeight, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}>
                        <div className='text-center' style={{ marginTop: 120 }}>
                            <p style={{ fontSize: 19, fontWeight: '500' }}>{ConstantHelper.loginTitle} to your Account</p>
                        </div>
                        <div className=''>
                            <form>
                                <Box
                                    className="w-100"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& > :not(style)': { m: 1 },
                                    }}
                                >
                                    <TextField onChange={(e) => setEmail(e.target.value)} className="w-100" id="demo-helper-text-misaligned-no-helper" label={ConstantHelper.emailTitle + "*"} />
                                </Box>
                                <div className='m-2'>
                                    <FormControl className="w-100" variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label={ConstantHelper.passwordTitle}
                                        />
                                    </FormControl>
                                </div>
                                <Fab onClick={() =>
                                    signUpAPI()
                                } className="w-100 mt-2 p-2" variant="extended" size="medium" color="primary" aria-label="add">
                                    {ConstantHelper.loginTitle}
                                </Fab>
                            </form>
                            <div className='col-sm-12 mt-3' style={{ textAlign: 'right' }}>
                                <Link to="/register">{ConstantHelper.registerTitle}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;