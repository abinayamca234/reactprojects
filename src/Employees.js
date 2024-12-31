import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        email: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        date_of_hire: '',
        salary: '',
        department: '',
        manager_id: '',
        status: 'Active',
        gender: '',
        job_title: '',
        emergency_contact: '',
    });
    const [editingEmployee, setEditingEmployee] = useState(null); // Employee to edit
    const [isEditing, setIsEditing] = useState(false); // Control modal visibility

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const addEmployee = async () => {
        if (!newEmployee.name || !newEmployee.position || !newEmployee.email) {
            alert('Please fill out all required fields!');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/employees', newEmployee);
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
            setNewEmployee({
                name: '',
                position: '',
                email: '',
                phone_number: '',
                address: '',
                date_of_birth: '',
                date_of_hire: '',
                salary: '',
                department: '',
                manager_id: '',
                status: 'Active',
                gender: '',
                job_title: '',
                emergency_contact: '',
            });
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
   
    // const deleteEmployee = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/api/employees/${id}`);
    //         fetchEmployees();
    //     } catch (error) {
    //         console.error('Error deleting employee:', error);
    //     }
    // };


    const deleteEmployee = async (id) => {
        const userConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(66, 42, 137);',
            cancelButtonColor: 'rgb(66, 42, 137);',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                text: 'custom-swal-text',
                confirmButton: 'custom-swal-confirm-btn',
                cancelButton: 'custom-swal-cancel-btn',
            },
        });
    
        if (!userConfirmed.isConfirmed) {
            return; // Exit if user cancels
        }
    
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
            fetchEmployees(); // Refresh the employee list
        } catch (error) {
            console.error('Error deleting employee:', error);
            Swal.fire('Error', 'Failed to delete the employee. Please try again.', 'error');
        }
    };
    

    const handleEditClick = (employee) => {
        setEditingEmployee({ ...employee }); // Clone employee object
        setIsEditing(true); // Show modal
    };

    const updateEmployee = async () => {
        try {
            await axios.put(`http://localhost:5000/api/employees/${editingEmployee.id}`, editingEmployee);
            setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp)));
            setIsEditing(false); // Close modal
            setEditingEmployee(null); // Clear state
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="employees-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Employee Details</h2>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Hire Date</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Gender</th>
                        <th>Job Title</th>
                        <th>Emergency Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name || 'N/A'}</td>
                                <td>{emp.position || 'N/A'}</td>
                                <td>{emp.email || 'N/A'}</td>
                                <td>{emp.phone_number || 'N/A'}</td>
                                <td>{emp.address || 'N/A'}</td>
                                <td>{emp.date_of_birth || 'N/A'}</td>
                                <td>{emp.date_of_hire || 'N/A'}</td>
                                <td>
                                    ${emp.salary && !isNaN(emp.salary) ? Number(emp.salary).toFixed(2) : 'N/A'}
                                </td>
                                <td>{emp.department || 'N/A'}</td>
                                <td>{emp.status || 'N/A'}</td>
                                <td>{emp.gender || 'N/A'}</td>
                                <td>{emp.job_title || 'N/A'}</td>
                                <td>{emp.emergency_contact || 'N/A'}</td>
                                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <button 
                                        onClick={() => handleEditClick(emp)} 
                                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-edit" style={{ color: 'rgb(66, 42, 137)', fontSize: '16px' }}></i>
                                    </button>
                                    <button 
                                        onClick={() => deleteEmployee(emp.id)} 
                                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-trash" style={{ color: 'rgb(66, 42, 137)', fontSize: '16px' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="15" style={{ textAlign: 'center' }}>No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div 
    style={{
        marginTop: '30px',
        color: 'white',
        backgroundColor: 'rgb(66, 42, 137)', // Purple background for the title container
        padding: '10px',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}
>
    <h3 style={{ margin: 0 }}>Add New Employee</h3>
</div>

{/* Form Container */}
<div 
    style={{
        backgroundColor: 'rgb(240, 240, 240)', // Light gray background for the form
        padding: '20px',
        borderRadius: '8px',
        marginTop: '10px'
    }}
>
    <div 
        style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px' 
        }}
    >
        <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone_number}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone_number: e.target.value })}
        />
        <input
            type="text"
            placeholder="Address"
            value={newEmployee.address}
            onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
        />
        <input
            type="date"
            placeholder="DOB"
            value={newEmployee.date_of_birth}
            onChange={(e) => setNewEmployee({ ...newEmployee, date_of_birth: e.target.value })}
        />
        <input
            type="date"
            placeholder="Hire Date"
            value={newEmployee.date_of_hire}
            onChange={(e) => setNewEmployee({ ...newEmployee, date_of_hire: e.target.value })}
        />
        <input
            type="number"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
        />
        <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <select
            value={newEmployee.status}
            onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
        >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
        </select>
        <select
            value={newEmployee.gender}
            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
        >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <input
            type="text"
            placeholder="Job Title"
            value={newEmployee.job_title}
            onChange={(e) => setNewEmployee({ ...newEmployee, job_title: e.target.value })}
        />
        <input
            type="text"
            placeholder="Emergency Contact"
            value={newEmployee.emergency_contact}
            onChange={(e) => setNewEmployee({ ...newEmployee, emergency_contact: e.target.value })}
        />
    </div>
    <div 
        style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '20px' 
        }}
    >
        <button 
            className="button-add"
            onClick={addEmployee} 
            style={{
                padding: '10px',
                width: '150px',
                textAlign: 'center',
                lineHeight: 'normal',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(66, 42, 137)', // Button color matching the title
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            Add Employee
        </button>
    </div>
</div>



            {/* Popup Modal for Editing */}
            {isEditing && (
                <div 
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.25)',
                        zIndex: 1000,
                    }}
                >
                    <div 
    style={{
      
        backgroundColor: 'rgb(66, 42, 137)', // Light gray background color
      
        padding: '5px', // Adds spacing inside the div
        borderRadius: '5px', // Rounds the corners of the div
        textAlign: 'center', // Centers the heading text
       
        display: 'flex', // Flexbox for vertical centering
        alignItems: 'center', // Vertically aligns content
        justifyContent: 'center' // Centers the heading text
    }}
>
    <h3>Edit Employee</h3>
</div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingEmployee.name}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            value={editingEmployee.position}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editingEmployee.email}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={editingEmployee.phone_number}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, phone_number: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={editingEmployee.address}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, address: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="DOB"
                            value={editingEmployee.date_of_birth}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, date_of_birth: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Hire Date"
                            value={editingEmployee.date_of_hire}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, date_of_hire: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Salary"
                            value={editingEmployee.salary}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            value={editingEmployee.department}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                        />
                        <select
                            value={editingEmployee.status}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Resigned">Resigned</option>
                        </select>
                        <select
                            value={editingEmployee.gender}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: e.target.value })}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={editingEmployee.job_title}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, job_title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Emergency Contact"
                            value={editingEmployee.emergency_contact}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, emergency_contact: e.target.value })}
                        />
                    </div>
                    <div 
    style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '10px', // Adds space between buttons
        marginTop: '20px' 
    }}
>
    <button 
        onClick={updateEmployee} 
        style={{ 
            padding: '10px 20px', 
            width: '100px', 
            backgroundColor: 'rgb(66, 42, 137)', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
        }}
    >
        Save
    </button>
    <button 
        onClick={() => setIsEditing(false)} 
        style={{ 
            padding: '10px 20px', 
            width: '100px', 
            color: 'rgb(66, 42, 137)', // Correct the syntax by removing the trailing semicolon
        
            outline: '2px solid rgb(66, 42, 137)', // Add an outline to match the color
            backgroundColor: 'transparent', // Make the button background transparent
            cursor: 'pointer' 
        }}
        
    >
        Cancel
    </button>
</div>

                </div>
            )}

            {/* Overlay for Modal */}
            {isEditing && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                    }}
                ></div>
            )}
        </div>
    );
};



export default EmployeeDetails;
