import React from 'react'
import UserService from '../services/userservice'
import { Button, Checkbox, Grid, Divider, Header, Icon, Label, Table, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

export default class AllUsers extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isInfoOpen: false,
            canShowDeleteDialog: false,
            currentUsr: {},
            counter: 0
        }
    }

    incrementCounter() {
        this.setState({
            counter: this.state.counter = this.state.counter + 1
        })
    }

    showInfoModal(usr) {
        this.setState({ isInfoOpen: true, currentUsr: usr })
    }

    hideInfoModal() {
        this.setState({ isInfoOpen: false })
    }

    showDeleteDialog(usr) {
        this.setState({ canShowDeleteDialog: true, currentUsr: usr })
    }

    hideDeleteDialog() {
        this.setState({ canShowDeleteDialog: false })
    }

    loadUsers() {
        UserService.all().then(response => {
            this.setState({
                users: response.data.map(data => ({ ...data, selected: false }))
            })
        }).then(() => console.log(`Result ${JSON.stringify(this.state.users)}`))
    }

    deleteUser() {
        UserService.delete(this.state.currentUsr.id)
            .then(response => {
                console.log(response.data);
            })
            .then(() => this.setState({ canShowDeleteDialog: false }))

    }

    changeUsrSelection(e, id) {
        this.setState({
            users: this.state.users.map(u => {
                if (u.id == id)
                    return ({ ...u, selected: !u.selected })
                else
                    return ({ ...u })
            })
        })

        console.log(JSON.stringify(this.state.users))
        console.log(`Now checkbox for ${id} is set to ${e.target.value}`)
    }

    componentDidMount() {
        this.loadUsers()

        //Remove comments when selection resolved
        /*setInterval(() => {
            this.loadUsers()
        }, 2000)*/
    }

    render() {
        return (
            <Grid columns='one' divided style={{ margin: "1em" }}>
                <Grid.Row>
                    <Grid.Column>
                        <h1>All Users</h1>

                        <Button as="div" labelPosition="right" id="btn" onClick={() => this.incrementCounter()}>
                            <Button color="red">
                                <Icon name="heart" />
                                Like
                            </Button>
                            <Label as="a" basic color="red" pointing="left">
                                {this.state.counter}
                            </Label>
                        </Button>

                        <Table celled stackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Select</Table.HeaderCell>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.users.map(usr => (
                                    <Table.Row key={usr.id} active={usr.selected}>
                                        <Table.Cell>
                                            <Checkbox checked={usr.selected} onChange={(e) => this.changeUsrSelection(e, usr.id)} />
                                        </Table.Cell>
                                        <Table.Cell>{usr.id}</Table.Cell>
                                        <Table.Cell>{usr.firstName}</Table.Cell>
                                        <Table.Cell>{usr.lastname}</Table.Cell>
                                        <Table.Cell>{usr.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button circular color="green" icon="eye" onClick={() => this.showInfoModal(usr)}></Button>
                                            <Link to={"/edit/" + usr.id}>
                                                <Button circular color="blue" icon="edit"></Button>
                                            </Link>
                                            <Button circular color="red" icon="trash" onClick={() => this.showDeleteDialog(usr)}></Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                        <Modal onClose={() => this.hideInfoModal()} onOpen={() => this.showInfoModal()} open={this.state.isInfoOpen}>
                            <Modal.Header>Info about user {this.state.currentUsr.id}</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>User info</Header>
                                    <table className="ui celled table yellow">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First name</th>
                                                <th>Second name</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.currentUsr.id}</td>
                                                <td>{this.state.currentUsr.firstName}</td>
                                                <td>{this.state.currentUsr.lastname}</td>
                                                <td>{this.state.currentUsr.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="primary" onClick={() => this.hideInfoModal()}><Icon name="close" />Close</Button>
                            </Modal.Actions>
                        </Modal>
                        {/* Delete dialog */}
                        <Modal size="mini" onClose={() => this.hideDeleteDialog()} onOpen={() => this.showDeleteDialog()} open={this.state.canShowDeleteDialog}>
                            <Modal.Header>Are you sure you want to delete User ID #{this.state.currentUsr.id}?</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>Delete user</Header>
                                    <h4>User <u>{this.state.currentUsr.firstName} {this.state.currentUsr.lastname}</u> will be removed?</h4>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="red" onClick={() => this.hideDeleteDialog()}><Icon name="close" />No</Button>
                                <Button color="green" onClick={() => this.deleteUser()}><Icon name="check" />Yes</Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

