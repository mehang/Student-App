import React, {Fragment, useEffect, useState} from 'react';
import {APIUrls} from "../../constants/urls";
import StudentForm, {msgType} from "../StudentForm";
import StudentTable from "../StudentTable";
import LayoutWrapper from "../LayoutWrapper";

// It is the demonstration of react hook.
// Displays both form and table for student and coordinates them
// through it's state. Also has the function to do REST API call
export function StudentPage() {
    //Declaring studentsInfo state and setStudentsInfo function
    // that acts as setter for the particular state
    const [studentsInfo, setStudentsInfo] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [statusMsgType, setStatusMsgType] = useState(msgType.SUCCESS);
    const [statusMsg, setStatusMsg] = useState("");
    const [clearFlag, setClearFlag] = useState(false);

    const fetchStudentsInfo = async () => {
        await fetch(`${APIUrls.Student}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching student informations");
                }
            })
            .then(data => {
                setStudentsInfo(data);
                setStatusMsgType(msgType.SUCCESS);
                // setStatusMsg("");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    //Is equivalent to class component's componentDidMount,
    // componentDidUpdate and componentWillUnmount lifecycle
    // use of the second argument tells it to run only when it mounts
    // if something is provided in second argument then it
    // runs only when the provided value changes
    useEffect(() => {
        fetchStudentsInfo();
    }, []);

    //REST API call for registering student
    const registerStudent = (name, phoneNumber, email, dob, university) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'phoneNumber': phoneNumber,
                'email': email,
                'dob': dob,
                'university': university,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Student, data)
            .then(res => {
                if (res.ok) {
                 return res.json();
                } else {
                    throw new Error("Email and phone number must be unique.")
                }
            })
            .then(data => {
                fetchStudentsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setStatusMsg("Saved successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                console.log(error);
                setStatusMsg( error.toString());
            });
    };

    //REST API call for updating student
    const updateStudent = async (id, name, phoneNumber, email, dob, university) => {
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'name': name,
                'phoneNumber': phoneNumber,
                'email': email,
                'dob': dob,
                'university': university,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Student, data)
            .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("\"Email and phone number must be unique.\"");
            }
            })
            .then(data => {
                fetchStudentsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setSelectedStudent({});
                setStatusMsg("Updated successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };


    //REST API call for deleting student
    const deleteStudent = (id) => {
        let fetchData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Student}delete/${id}`, fetchData)
            .then(res => {
                if (res.ok) {
                fetchStudentsInfo();
                } else {
                    throw new Error("Error while deleting student.");
                }
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const clearStatus = () => {
        setStatusMsgType(msgType.SUCCESS);
        setStatusMsg("");
    };

    const statusClassName = statusMsgType === msgType.ERROR?'error-status': 'success-status';

    //Fragment allows to group a list of children without adding extra nodes to the DOM
    return (
        <Fragment>
            <StudentForm
                registerStudent={registerStudent}
                fetchStudentsInfo={fetchStudentsInfo}
                updateStudent={updateStudent}
                clearFlag={clearFlag}
                setClearFlag={setClearFlag}
                selectedStudent={selectedStudent}
                clearStatus={clearStatus}
            />
            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
            <StudentTable
                studentsInfo={studentsInfo}
                setSelectedStudent={setSelectedStudent}
                deleteStudent={deleteStudent}
            />
        </Fragment>
    )
}

const WrappedStudentPage = LayoutWrapper(StudentPage);
export default WrappedStudentPage;