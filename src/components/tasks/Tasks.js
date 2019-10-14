import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateTask from './create_tasks/CreateTasks';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            BASE_URL: 'https://heroku-todos-api.herokuapp.com/api/v1',
            DEST_URL: 'todos/3/items'
        };
        this.loadTasks = this.loadTasks.bind(this);
        this.removeFineshedItems = this.removeFineshedItems.bind(this);
    }
 
    async loadTasks() {
        let response = await fetch(`${this.state.BASE_URL}/${this.state.DEST_URL}`);
        const tasks = await response.json();
        this.setState({ tasks: tasks });
    }

    async removeFineshedItems(tasks) {
        Swal.fire({
            type: 'question',
            text: 'Are you sure you want to delete all tasks?',
            showCancelButton: true
        }).then(async result => {
            if(result.value){
                tasks.map(async t => {
                    if(t.done)
                       await fetch(`${this.state.BASE_URL}/${this.state.DEST_URL}/${t.id}`, { method: 'DELETE' });
                });
                this.loadTasks();
            }
        });
    }

    componentDidMount() {
        this.loadTasks();
    }
    
    render() {
        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">To-do</p>
                    <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != true)} />
                    <CreateTask loadTasks={this.loadTasks} />
                </Col>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">Done</p>
                    <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done == true)} />
                    <Button onClick={() => this.removeFineshedItems(this.state.tasks)} variant="danger" className="float-right remove_tasks_btn mt-2 mb-2">Remove fineshed tasks</Button>
                </Col>
            </Row>
        );
    }
}

export default Tasks;
