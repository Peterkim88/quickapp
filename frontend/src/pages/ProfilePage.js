import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

function ProfilePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/login'

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate(redirect)
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            console.log('Update...')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>

                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            type='name'
                            required
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>

                    </Form.Group>

                    <Form.Group controlId='email'>

                        <Form.Label>Email Address</Form.Label>

                        <Form.Control
                            type='email'
                            required
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>

                    </Form.Group>

                    <Form.Group controlId='password'>

                        <Form.Label>New Password</Form.Label>

                        <Form.Control
                            type='password'
                            required
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>

                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>

                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type='password'
                            required
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>

                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfilePage