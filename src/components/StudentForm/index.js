import React, {Component} from "react";
import {APIUrls} from "../../constants/constants";


export default class Student extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            phoneNumber: "",
            email: "",
            dob: "",
            students: ""
        }
    }

    componentDidMount() {
    };

    fetchStudents = () => {
        fetch(APIUrls.Student)
            .then(res => res.json())
            .then(data => this.setState({students: data}))
            .catch(error => console.log(error));
    };

    registerStudent = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
                'phoneNumber': this.state.phoneNumber,
                'email': this.state.email,
                'dob': this.state.dob,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Student, data)
            .then(res => res.json())
            .then(data => this.fetchStudents())
            .catch(error => console.log(error));
    }

    return() {
        return ()
    }


}