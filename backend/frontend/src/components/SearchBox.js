import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const nav = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword){
            nav(`/?keyword=${keyword}&page=1`)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search"
                className='form-control me-2'
            ></Form.Control>
            <Button
                type='submit'
                variant='secondary'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox