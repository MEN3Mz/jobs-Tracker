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
            dispatch(loginUser({ email: email, password: password }))
                .unwrap()
                .then((payload) => {
                    navigate('/');
                    setTimeout(() => {
                        toast.success(`Welcome Back ${payload.user.name}`);
                    }, 300);
                });
            return;
        }
        dispatch(registerUser({ name, email, password }))
            .unwrap()
            .then(() => {
                navigate(`/unverified-account?email=${encodeURIComponent(email)}`);
            });
    };

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember });
    };
    const loginDemoUser = () => {
        dispatch(loginUser({ email: 'zaza@gmail.com', password: 'BOBOBOBO34' }))
            .unwrap()
            .then((payload) => {
                navigate('/');
                setTimeout(() => {
                    toast.success(`Welcome Back ${payload.user.name}`);
                }, 300);
            });
    };
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);
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
        /> {
            !values.isMember && ( <
                p className = 'register-hint' > Use your university email ending with guc.edu.eg or giu-uni.de, including addresses like @student.guc.edu.eg. < /p>
            )
        } { /* password field */ } <
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
