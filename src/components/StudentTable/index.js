import React from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';
import {isEmpty} from "../../utils/utils";

//Functional component for displaying student information in a table
function StudentTable(props) {
    //destructuring props
    const {studentsInfo, setSelectedStudent, deleteStudent} = props;

    //Describing columns and their structure for the table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => <div>{email}</div>
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            render: dob => <div>{isEmpty(dob) ? "-" : dob.substring(0, 10)}</div>
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: phoneNumber => <div>{phoneNumber}</div>
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            render: university => <div>{university}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, student) => (
                <span>
                        <a onClick={() => setSelectedStudent(student)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteStudent(student.key)}>Delete</a>
                    </span>
            )
        },
    ];

    //mapping the students information into suitable objects
    // whose keys must conform with respective columns
    const studentsData = studentsInfo.map(student => {
        return ({
            key: student.id,
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber,
            university: student.university,
            dob: student.dob,
        })
    });

    return (
        <Table columns={columns} dataSource={studentsData}/>
    )
}

//declaring the type for each prop that has to be passed
StudentTable.propTypes = {
    studentsInfo: PropTypes.array.isRequired,
    setSelectedStudent: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
};

export default StudentTable;