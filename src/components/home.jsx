import React from "react";
import { Button, Card, CardMeta, Icon, Image, List } from 'semantic-ui-react'
import { BrowserRouter, Link, Switch, Route, NavLink } from "react-router-dom";

const Home = (props) => {
    return (
        <Card centered>
                <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
            <Card.Content>
                <Card.Header>Hello, World!</Card.Header>
                <Card.Meta>
                    <span className="date">Greeting!</span>
                </Card.Meta>
                <Card.Description>
                    You are using the dummy example of React.JS with Semantic UI frontend library.
                    Use such resources to enjoy this website's functionality.
                </Card.Description>
                <Card.Content extra>
                    <List selection verticalAlign="middle">
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Link to="/">
                                        <Button color="red" circular><Icon name="home" />Home</Button>
                                    </Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Link to="/list">
                                        <Button color="orange" circular><Icon name="table" /> All Users</Button>
                                    </Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Link to="/add">
                                        <Button color="green" circular><Icon name="address card" />Create a New User</Button>
                                    </Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card.Content>
        </Card>
    )
}

export default Home