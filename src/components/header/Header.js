import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

class Header extends Component {
    async clear() {
        const BASE_URL = 'https://heroku-todos-api.herokuapp.com/api/v1';
        const DEST_URL = 'todos/3/items_set';

        Swal.fire({
            type: 'question',
            text: 'Are you sure you want to clear all tasks?',
            showCancelButton: true
        }).then(async result => {
            if(result.value){
                await fetch(`${BASE_URL}/${DEST_URL}`, { method: 'DELETE' });
                window.location.reload(true);
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <FontAwesomeIcon icon="check-circle" size="1x" /> Task Finisher
                    </Navbar.Brand>
                    <Button 
                        onClick={this.clear} 
                        variant="danger" 
                        className="float-right remove_tasks_btn mt-2 mb-2">
                            Clear All
                    </Button>
                </Navbar>
            </div>
        );
    }
}

export default Header;