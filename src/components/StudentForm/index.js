import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';

import {
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
} from 'antd';
import {validateEmail, validatePhoneNumber} from "../../utils/validators";
import moment from "moment";
import {isEmpty, isNumber} from "../../utils/utils";

const {Option} = Select;
const InputGroup = Input.Group;


export const msgType = Object.freeze({'SUCCESS': 'Success', 'ERROR': 'error'});

/**
 * Class component for displaying form, handling validation of input and triggering submission.
 */
export class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneExtension: "1",
            phoneNumber: "",
            email: "",
            dob: "",
            university: "",
            validation: {
                name: {
                    required: true,
                    error: ""
                },
                dob: {
                    required: false,
                    error: ""
                },
                email: {
                    required: true,
                    error: ""
                },
                phoneNumber: {
                    required: true,
                    error: ""
                },
                university: {
                    required: true,
                    error: ""
                }
            },
        }
    }

    // This function is invoked immediately after updating occurs.
    // It is not called for the initial render.
    // Conditions need to be setup so that update does not go on loop
    componentDidUpdate(prevProps, prevState) {
        const {clearFlag, setClearFlag, selectedStudent} = this.props;
        //checking whether to clear fields or not
        if ((clearFlag !== prevProps.clearFlag) &&
            clearFlag) {
            this.clearForm();
            setClearFlag(false);
        }

        //checking whether a student object has been passed for update or not
        if (!isEmpty(selectedStudent) && (prevProps.selectedStudent.key !== selectedStudent.key)) {
            let phoneExtension = selectedStudent.phoneNumber.charAt(1);
            let phoneNumber = selectedStudent.phoneNumber.substring(
                3, selectedStudent.phoneNumber.length);
            //clearing all previous validation errors
            let {validation} = this.state;
            validation.name.error = "";
            validation.email.error = "";
            validation.phoneNumber.error = "";
            validation.dob.error = "";
            validation.university.error = "";
            //setting up new state
            this.setState({
                name: selectedStudent.name,
                email: selectedStudent.email,
                dob: selectedStudent.dob,
                phoneExtension: phoneExtension,
                phoneNumber: phoneNumber,
                university: selectedStudent.university,
                validation: validation,
            })
        }
    }

    //clears all fields and validation errors of the form
    clearForm = () => {
        let {
            name, email, phoneExtension, phoneNumber,
            dob, university, validation
        } = this.state;
        name = "";
        email = "";
        phoneExtension = "1";
        phoneNumber = "";
        dob = "";
        university = "";
        validation.name.error = "";
        validation.email.error = "";
        validation.phoneNumber.error = "";
        validation.dob.error = "";
        validation.university.error = "";
        this.setState({
            name, email, phoneExtension, phoneNumber,
            dob, university, validation
        });
    };

    // checks if any validation errors are present and then calls the
    // registerStudent() or updateStudent() function
    handleSubmit = e => {
        e.preventDefault();
        const {name, phoneExtension, phoneNumber, email, dob, university, validation} = this.state;
        const {selectedStudent, registerStudent, updateStudent} = this.props;
        if (!(validation.name.error || validation.dob.error || validation.email.error
            || validation.phoneNumber.error || validation.university.error)) {
            if (isEmpty(selectedStudent)) {
                registerStudent(
                    name, `+${phoneExtension}-${phoneNumber}`,
                    email, dob, university
                );
            } else {
                updateStudent(
                    selectedStudent.key, name, `+${phoneExtension}-${phoneNumber}`,
                    email, dob, university
                );
            }
        }
    };

    onNameChange = e => {
        this.setState({name: e.target.value});
    };

    onPhoneExtensionChange = e => {
        this.setState({phoneExtension: e.target.value});
    };

    onPhoneNumberChange = e => {
        let value = e.target.value;
        if (isNumber(value)) {
            this.setState({phoneNumber: e.target.value});
        }
    };

    onEmailChange = e => {
        this.setState({email: e.target.value});
    };

    onDOBChange = value => {
        this.setState({dob: value});
    };

    onUniversityChange = e => {
        this.setState({university: e.target.value});
    };

    validateName = () => {
        let {validation} = this.state;
        if (validation.name.required && this.state.name === "") {
            validation.name.error = "This input is required";
        } else {
            validation.name.error = "";
        }
        this.setState({validation: validation});
    };

    validateEmail = () => {
        let {validation} = this.state;
        if (this.state.email !== "") {
            if (!validateEmail(this.state.email)) {
                validation.email.error = "This input is not valid E-mail.";
            } else {
                validation.email.error = "";
            }
            this.setState({validation: validation});
        } else {
            if (validation.email.required) {
                validation.email.error = "This input is required.";
                this.setState({validation: validation});
            }
        }
    };

    validatePhoneNumber = () => {
        let {validation} = this.state;
        if (this.state.phoneNumber !== "") {
            if (!validatePhoneNumber(this.state.phoneNumber)) {
                validation.phoneNumber.error = "This input is not valid phone number.";
            } else {
                validation.phoneNumber.error = "";
            }
            this.setState({validation: validation});
        } else {
            if (validation.phoneNumber.required) {
                validation.phoneNumber.error = "This input is required.";
                this.setState({validation: validation});
            }
        }
    };

    validateUniversity = () => {
        let {validation} = this.state;
        if (validation.university.required && this.state.university === "") {
            validation.university.error = "This input is required.";
        } else {
            validation.university.error = ""
        }
        this.setState({validation: validation});
    };

    disableFutureDays = current => {
        // Can not select days after today and today
        return current && current >= moment().endOf('day');
    };

    render() {
        const {selectedStudent, clearStatus} = this.props;

        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    onBlur={this.validateName}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Email</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.email}
                                    onChange={this.onEmailChange}
                                    onBlur={this.validateEmail}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.email.error &&
                                <div className="input-error">{this.state.validation.email.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label>Date of birth</label>
                            </Col>
                            <div className={{"display": "flex"}} onClick={clearStatus}>
                                <DatePicker
                                    style={{"display": "flex"}}
                                    value={this.state.dob ? moment(this.state.dob) : null}
                                    onChange={this.onDOBChange}
                                    disabledDate={this.disableFutureDays}
                                />
                            </div>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Phone number</label>
                            </Col>
                            <Col span={8}>
                                <InputGroup compact onFocus={clearStatus}>
                                    <Select
                                        style={{width: '15%'}}
                                        value={this.state.phoneExtension}
                                        onChange={this.onPhoneExtensionChange}
                                    >
                                        <Option value="1">+1</Option>
                                        <Option value="2">+2</Option>
                                    </Select>
                                    <Input
                                        style={{width: '85%', textAlign: "left"}}
                                        value={this.state.phoneNumber}
                                        onChange={this.onPhoneNumberChange}
                                        onBlur={this.validatePhoneNumber}
                                    />
                                    {this.state.validation.phoneNumber.error &&
                                    <div className="input-error">{this.state.validation.phoneNumber.error}</div>}
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">University</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.university}
                                    onChange={this.onUniversityChange}
                                    onBlur={this.validateUniversity}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.university.error &&
                                <div className="input-error">{this.state.validation.university.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        {isEmpty(selectedStudent) ? "Register" : "Update"}
                    </Button>
                </form>
            </Fragment>
        );
    }
}

StudentForm.propTypes = {
    registerStudent: PropTypes.func.isRequired,
    fetchStudentsInfo: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    clearFlag: PropTypes.bool.isRequired,
    setClearFlag: PropTypes.func.isRequired,
    selectedStudent: PropTypes.object.isRequired,
    clearStatus: PropTypes.func.isRequired
};

export default StudentForm;