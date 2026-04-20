import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const [authAction, setAuthAction] = useState(null);
    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setValues({...values, [name]: value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all fields');
            return;
        }
        if (isMember) {
            setAuthAction('login');
            dispatch(loginUser({ email: email, password: password }));
            return;
        }
        setAuthAction('register');
        dispatch(registerUser({ name, email, password }));
    };

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember });
    };
    const loginDemoUser = () => {
        setAuthAction('login');
        dispatch(loginUser({ email: 'zaza@gmail.com', password: 'BOBOBOBO34' }));
    };
    useEffect(() => {
        if (user && authAction) {
            navigate('/');
            setTimeout(() => {
                toast.success(
                    authAction === 'login'
                        ? `Welcome Back ${user.name}`
                        : `Hello There ${user.name}`
                );
                setAuthAction(null);
            }, 300);
        }
    }, [authAction, navigate, user]);
    return ( <
        Wrapper className = 'full-page' >
        <
        form className = 'form'
        onSubmit = { onSubmit } >
        <
        Logo / >
        <
        h3 > { values.isMember ? 'Login' : 'Register' } < /h3> { /* name field */ } {
            !values.isMember && ( <
                FormRow type = 'text'
                name = 'name'
                value = { values.name }
                handleChange = { handleChange }
                />
            )
        } { /* email field */ } <
        FormRow type = 'email'
        name = 'email'
        value = { values.email }
        handleChange = { handleChange }
        /> { /* password field */ } <
        FormRow type = 'password'
        name = 'password'
        value = { values.password }
        handleChange = { handleChange }
        /> <
        button type = 'submit'
        className = 'btn btn-block'
        disabled = { isLoading } > { isLoading ? 'loading...' : 'submit' } <
        /button> <
        button type = 'button'
        className = 'btn btn-block btn-hipster'
        disabled = { isLoading }
        onClick = { loginDemoUser } >
        { isLoading ? 'loading...' : 'demo app' } <
        /button> <
        p > { values.isMember ? 'Not a member yet?' : 'Already a member?' } <
        button type = 'button'
        onClick = { toggleMember }
        className = 'member-btn' > { values.isMember ? 'Register' : 'Login' } <
        /button> <
        /p> <
        /form> <
        /Wrapper>
    );
}
export default Register;
