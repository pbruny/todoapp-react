import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';

class Tasks extends Component {
    render() {
        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">To-do</p>
                    <List/>
           </Col>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">Done</p>
                    <List/>
           </Col>
            </Row>
        );
    }
}

export default Tasks;