import React from "react";
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Card, Segment, Grid, Form, Label, Button, Modal, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import UserService from "../services/userservice";

const AddUser = (props) => {

    const history = useHistory()

    let [firstname, setFirstname] = useState("")
    let [lastname, setLastname] = useState("")
    let [email, setEmail] = useState("")
    let [showConfirm, setShowConfirm] = useState(false)
    let [allFilled, setAllFilled] = useState(false)

    const onChangeFirstname = (e) => {
        setFirstname(e.target.value)
        checkAllFilled()
    }

    const onChangeLastname = (e) => {
        setLastname(e.target.value)
        checkAllFilled()
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        console.log(`Your new value is ${email}`)
        checkAllFilled()
    }

    const showCreateConfirm = () => setShowConfirm(true)

    const hideCreateConfirm = () => setShowConfirm(false)

    const checkAllFilled = () => {
        if (firstname.length > 3 && lastname.length > 3 && email.length > 3) {
            setAllFilled(true)
        } else {
            setAllFilled(false)
        }
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
        <Grid columns={3} style={{ margin: "2em" }} stackable>
            <Grid.Column>
                <Button color="red" onClick={() => history.goBack()}><Icon name="arrow left" />Back</Button>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <h1 style={{ textAlign: "center" }}>Adding new user</h1>
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
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Card style={{ borderRadius: "25px", boxShadow: `0px 0px ${allFilled ? "50px green" : "10px red"}` }}>
                    <Card.Content>
                        <Card.Header>Preview</Card.Header>
                        <Card.Meta>User</Card.Meta>
                        <Card.Description>
                            <ul className="ui list">
                                <li>First Name: <strong>{firstname}</strong></li>
                                <li>Last Name: <strong>{lastname}</strong></li>
                                <li>Email: <strong>{email}</strong></li>
                                <Segment>
                                    {!allFilled ?
                                        (<Label color="red" ribbon ><Icon name="lock" />Locked</Label>)
                                        : (<Label color="green" ribbon ><Icon name="unlock" />Unlocked</Label>)
                                    }
                                    <Button color="green" onClick={showCreateConfirm} disabled={!allFilled}><Icon name="pencil" />Create</Button>
                                </Segment>
                            </ul>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Modal onClose={hideCreateConfirm} onOpen={showCreateConfirm} open={showConfirm} closeIcon size="mini">
                    <Modal.Header>Are you sure to create user?</Modal.Header>
                    <Modal.Content>
                        <ul className="ui list">
                            <li>First Name: {firstname}</li>
                            <li>Last Name: {lastname}</li>
                            <li>Email: {email}</li>
                        </ul>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={hideCreateConfirm}><Icon name="close" />No</Button>
                        <Button color="green" onClick={createUser}><Icon name="check" />Yes</Button>
                    </Modal.Actions>
                </Modal>
            </Grid.Column>
        </Grid>
    )
}

export default AddUser