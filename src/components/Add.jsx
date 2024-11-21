import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import upimg from '../assets/imageupload.png';
import { addprojectapi } from '../services/aalApi';
import { addresponsecontext } from '../context/ContextShare';

function Add() {
 const  {addresponse,setaddresponse} = useContext(addresponsecontext)
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [preview, setPreview] = useState(upimg);
  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImage: ""
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectData.projectImage) {
      const fileType = projectData.projectImage.type;
      if (fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg") {
        setImageFileStatus(true);
        setPreview(URL.createObjectURL(projectData.projectImage));
      } else {
        setImageFileStatus(false);
        setPreview(upimg);
        setProjectData({ ...projectData, projectImage: "" });
      }
    }
  }, [projectData.projectImage]);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImage: ""
    });
  };

  const handleShow = () => setShow(true);

  const handlesaveproject = async () => {
    const { title, languages, overview, github, website, projectImage } = projectData;
    console.log(projectData)
    if (title && languages && overview && github && website && projectImage) {
      const reqbody = new FormData();
      reqbody.append("title", title);
      reqbody.append("languages", languages);
      reqbody.append("overview", overview);
      reqbody.append("github", github);
      reqbody.append("website", website);
      reqbody.append("projectImage", projectImage); // Ensure this matches multer
  
      const token = sessionStorage.getItem("token");
      console.log("Token from sessionStorage:", token);
  
      if (token) {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        console.log("Request Headers:", reqheader);
  
        try {
          const result = await addprojectapi(reqbody, reqheader);
          console.log("Server Response:", result);
          if (result.status === 200) {
            handleClose();
            // alert("Project added successfully!!");
            // share result via context
            setaddresponse(result)
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log("Add project error:", err);
          if (err.response && err.response.status === 401) {
            alert('Unauthorized. Please log in again.');
          } else {
            alert('Failed to add project.');
          }
        }
      } else {
        alert("Please log in to proceed.");
      }
    } else {
      alert("Please fill the form completely");
    }
  };
  
  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>
        <i className='fa-solid fa-plus'></i> New project
      </button>
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })}
                  style={{ display: "none" }}
                  name="projectImage"
                  type="file"
                />
                <img height={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              {!imageFileStatus && <div className="text-warning fw-bolder my-2">*upload only jpeg, jpg, or png files here!!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  value={projectData.title}
                  onChange={e => setProjectData({ ...projectData, title: e.target.value })}
                  type="text"
                  placeholder='Project Title'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.languages}
                  onChange={e => setProjectData({ ...projectData, languages: e.target.value })}
                  type="text"
                  placeholder='Languages used in project'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.overview}
                  onChange={e => setProjectData({ ...projectData, overview: e.target.value })}
                  type="text"
                  placeholder='Project Overview'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.github}
                  onChange={e => setProjectData({ ...projectData, github: e.target.value })}
                  type="text"
                  placeholder='Project GITHUB Link'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.website}
                  onChange={e => setProjectData({ ...projectData, website: e.target.value })}
                  type="text"
                  placeholder='Project Website Link'
                  className='form-control'
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handlesaveproject} variant='primary'>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
