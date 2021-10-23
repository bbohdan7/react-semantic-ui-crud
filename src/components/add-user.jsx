import React from "react";
import { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import UserService from "../services/userservice";

const AddUser = (props) => {

    const history = useHistory()

    let [firstname, setFirstname] = useState("")
    let [lastname, setLastname] = useState("")
    let [email, setEmail] = useState("")

    const onChangeFirstname = (e) => {
        setFirstname(e.target.value)
    }

    const onChangeLastname = (e) => {
        setLastname(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        console.log(`${firstname} ${lastname} ${email}`)
    }

    const createUser = () => {
        UserService.create({
            firstName: firstname,
            lastname: lastname,
            email: email
        }).then(() => {
            history.push("/")
        })
    }

    return (
        <Grid columns={3}>
            <Grid.Column>
                <Button color="red" onClick={() => history.goBack()}><Icon name="arrow left" />Back</Button>
            </Grid.Column>
            <Grid.Column>
                <h1>Adding new user</h1>

                <Form>
                    <Form.Field>
                        <label>First name</label>
                        <input type="text" placeholder="Enter your first name" value={firstname} onChange={onChangeFirstname} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last name</label>
                        <input type="text" placeholder="Enter your last name" value={lastname} onChange={onChangeLastname} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={onChangeEmail} />
                    </Form.Field>
                    <Button color="green" onClick={createUser}><Icon name="pencil" />Create</Button>
                </Form>
            </Grid.Column>
            <Grid.Column></Grid.Column>
        </Grid>
    )
}

export default AddUser