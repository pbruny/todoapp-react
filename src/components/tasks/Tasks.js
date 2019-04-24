import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateTask from './create_tasks/CreateTasks';
import Button from 'react-bootstrap/Button';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.loadTasks = this.loadTasks.bind(this);
    }

    async loadTasks() {
        const BASE_URL = 'https://heroku-todos-api.herokuapp.com/api/v1';
        const DEST_URL = 'todos/3/items';
        let response = await fetch(`${BASE_URL}/${DEST_URL}`);
        const tasks = await response.json();
        this.setState({ tasks: tasks });
    }

    componentDidMount() {
        this.loadTasks();
    }
    render() {
        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">To-do</p>
                    <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != true)}/>
                    <CreateTask loadTasks={this.loadTasks}/>
                </Col>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">Done</p>
                    <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done == true)}/>
                    <Button variant="danger" className="float-right remove_tasks_btn mt-2 mb-2">Remove all tasks</Button>
                </Col>
            </Row>
        );
    }
}

export default Tasks;