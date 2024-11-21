import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profileicon from '../assets/profileicon.jpg';
import { edituserapi } from '../services/aalApi';
import serverurl from '../services/serverUrl';

const Profile = () => {
    const [preview, setPreview] = useState("");
    const [existingUserImg, setExistingUserImg] = useState("");
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        github: "",
        linkedin: ""
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            const existingUserDetails = JSON.parse(sessionStorage.getItem("user"));
            setUserData({
                username: existingUserDetails.username,
                email: existingUserDetails.email,
                password: existingUserDetails.password,
                github: existingUserDetails.github,
                linkedin: existingUserDetails.linkedin
            });
            setExistingUserImg(existingUserDetails.profilepic);
        }
    }, [open]);

    useEffect(() => {
        if (userData.profilepic) {
            setPreview(URL.createObjectURL(userData.profilepic));
        } else {
            setPreview("");
        }
    }, [userData.profilepic]);

    const handleUpdate = async () => {
        const { username, email, password, github, linkedin, profilepic } = userData;
        if (github && linkedin) {
            const reqBody = new FormData();
            reqBody.append("username", username);
            reqBody.append("email", email);
            reqBody.append("password", password);
            reqBody.append("github", github);
            reqBody.append("linkedin", linkedin);
            reqBody.append("profilepic", preview ? profilepic : existingUserImg);
    
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };
                try {
                    const result = await edituserapi(reqBody, reqHeader);
                    if (result.status === 200) {
                        sessionStorage.setItem("user", JSON.stringify(result.data));
                        setOpen(!open);
                    } else {
                        console.error(result);
                    }
                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            } else {
                alert("Token not found. Please log in again.");
            }
        } else {
            alert("Please fill out the form completely");
        }
    };
    

    return (
        <>
            <div className="d-flex justify-content-evenly">
                <h3 className='text-warning'>Profile</h3>
                <button onClick={() => setOpen(!open)} className='btn text-warning fw-bolder'>
                    <i className='fa-solid fa-chevron-down'></i>
                </button>
            </div>
            <Collapse in={open}>
                <div className='row align-items-center justify-content-center shadow rounded p-2' id="example-collapse-text">
                    <label className='text-center mb-2'>
                        <input onChange={e => setUserData({ ...userData, profilepic: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                        {existingUserImg === "" ? (
                            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : profileicon} alt="Profile Icon" />
                        ) : (
                            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `${serverurl}/uploads/${existingUserImg}`} alt="Profile Icon" />
                        )}
                    </label>
                    <div className="mb-2">
                        <input onChange={e => setUserData({ ...userData, github: e.target.value })} value={userData.github} placeholder='GITHUB URL' className='form-control' type="text" />
                    </div>
                    <div className="mb-2">
                        <input onChange={e => setUserData({ ...userData, linkedin: e.target.value })} value={userData.linkedin} placeholder='LINKEDIN URL' className='form-control' type="text" />
                    </div>
                    <div className='d-grid'>
                        <button onClick={handleUpdate} className='btn btn-warning'>Update Profile</button>
                    </div>
                </div>
            </Collapse>
        </>
    );
};

export default Profile;
