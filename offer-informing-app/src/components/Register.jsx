import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Register() {
    const { userType } = useParams(); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: userType || 'customer', 
        shopName: '',
        shopAddress: '',
        shopContact: ''
    });
    
    const [alert, setAlert] = useState({ type: '', message: '' });

    const { name, email, password, userType: stateUserType, shopName, shopAddress, shopContact } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/api/auth/register';
            const data = stateUserType === 'business'
                ? { name, email, password, userType: stateUserType, shopName, shopAddress, shopContact }
                : { name, email, password, userType: stateUserType };

            const res = await axios.post(url, data);
            setAlert({ type: 'success', message: 'Registration successful!' });
            console.log(res.data);
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Registration failed.' });
            console.error(err.response?.data);
        }
    };

    useEffect(() => {
        if (userType) {
            setFormData(prevState => ({ ...prevState, userType }));
        }
    }, [userType]);

    return (
        <div className="max-w-md min-h-[82vh] mx-auto p-6">
            {alert.message && (
                <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
                    <div className="flex-1">
                        <label className="sr-only">{alert.type === 'success' ? 'Success' : 'Error'}</label>
                        {alert.message}
                    </div>
                </div>
            )}
            <form
                onSubmit={onSubmit}
                className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">User Type</span>
                    </label>
                    <select
                        name="userType"
                        value={stateUserType}
                        onChange={onChange}
                        className="select select-bordered w-full"
                        disabled
                    >
                        <option value="customer">Customer</option>
                        <option value="business">Business</option>
                    </select>
                </div>
                {stateUserType === 'business' && (
                    <>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Shop Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your shop name"
                                name="shopName"
                                value={shopName}
                                onChange={onChange}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Shop Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your shop address"
                                name="shopAddress"
                                value={shopAddress}
                                onChange={onChange}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Shop Contact</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your shop contact"
                                name="shopContact"
                                value={shopContact}
                                onChange={onChange}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                    </>
                )}


                <button
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
