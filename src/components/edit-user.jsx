import React, { useEffect, useState } from "react";
import UserService from "../services/userservice";
import { Button, Grid, Form, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useHistory, useParams } from "react-router";


const EditUser = (props) => {
    const history = useHistory()
    const { id } = useParams()

    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")

    const changeFirstName = (e) => setFirstName(e.target.value)
    const changeLastName = (e) => setLastName(e.target.value)
    const changeEmail = (e) => setEmail(e.target.value)
    const updateUser = () => UserService.update({
        id: id,
        firstName: firstName,
        lastname: lastName,
        email: email
    }).then(() => history.push("/list"))

    useEffect(() => {
        UserService.find(id).then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastname)
            setEmail(response.data.email)
        }).then(() => console.log("Find user"))
    }, {})

    return (
        <Grid columns="three">
            <Grid.Row>
                <Grid.Column>
                    <Button color="blue" onClick={() => history.goBack()}><Icon name="arrow left" />Back</Button>
                </Grid.Column>
                <Grid.Column>
                    <h1>Editing user {id}</h1>

                    <Form>
                        <Form.Field>
                            <label>First a new first name</label>
                            <input type="text" placeholder="Enter a new First name for the user" value={firstName} onChange={changeFirstName} />
                        </Form.Field>

                        <Form.Field>
                            <label>First a new last name</label>
                            <input type="text" placeholder="Enter a new Last name for the user" value={lastName} onChange={changeLastName} />
                        </Form.Field>

                        <Form.Field>
                            <label>First a new email</label>
                            <input type="email" placeholder="Enter a new email for the user" value={email} onChange={changeEmail} />
                        </Form.Field>

                        <Button color="green" onClick={() => updateUser()}><Icon name="edit" />Edit</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default EditUser