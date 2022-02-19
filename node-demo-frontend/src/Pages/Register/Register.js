import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
import { useHistory } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { registerAPI, registerSuccessChange } from './Store/registerSliceData';
import ConstantHelper from '../../Helper/ConstantHelper';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Register = () => {

    const appRef = useRef();
    const history = useHistory()
    const dispatch = useDispatch();
    const { registerSuccess } = useSelector(state => state.register)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
        if (registerSuccess === true) {
            localStorage.setItem('isLogin', true)
            dispatch(registerSuccessChange(false))
            history.push('/app')
        }
    }, [registerSuccess])

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
    
    const [confirmValues, setConfirmValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChangeConfirmPassword = (prop) => (event) => {
        setConfirmPassword(event.target.value)
        setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };

    const handleClickShowConfirmPassword = () => {
        setConfirmValues({
            ...confirmValues,
            showPassword: !confirmValues.showPassword,
        });
    };

    const handleMousDownConfirmPassword = (event) => {
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
        }
        else if (confirmPassword === "") {
            setErrorMsg("Password is requied!  ")
            setState({ open: true, vertical: 'top', horizontal: 'center' });
        }
        else if (password !== confirmPassword) {
            setErrorMsg("Password and confirm password dose not match!")
            setState({ open: true, vertical: 'top', horizontal: 'center' });
        }
        else {
            let formData = {
                name: email,
                password
            }
            dispatch(registerAPI({ payload: formData }))
        }
    }

    return (
        <><Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            // message="I love snacks"
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
                            <p style={{ fontSize: 19, fontWeight: '500' }}>{ConstantHelper.registerTitle} to your Account</p>
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
                                        <InputLabel htmlFor="outlined-adornment-password">{ConstantHelper.passwordTitle}*</InputLabel>
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
                                <div className='m-2'>
                                    <FormControl className="w-100" variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">{ConstantHelper.confirmPasswordTitle}*</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={confirmValues.showPassword ? 'text' : 'password'}
                                            value={confirmValues.password}
                                            onChange={handleChangeConfirmPassword('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMousDownConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label={ConstantHelper.confirmPasswordTitle}
                                        />
                                    </FormControl>
                                </div>
                                <Fab onClick={() =>
                                    signUpAPI() //history.push('/app')
                                } className="w-100 mt-2 p-2" variant="extended" size="medium" color="primary" aria-label="add">
                                    {ConstantHelper.registerTitle}
                                </Fab>
                            </form>
                            <div className='col-sm-12 mt-3' style={{ textAlign: 'right' }}>
                                <Link to="/">{ConstantHelper.loginTitle}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;