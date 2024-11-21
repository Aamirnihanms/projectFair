import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import upimg from '../assets/imageupload.png';
import serverurl from '../services/serverUrl';
import { editresponsecontext } from '../context/ContextShare';
import { editprojectapi } from '../services/aalApi';

function Edit({ project }) {
  const { editresponse, seteditresponse } = useContext(editresponsecontext);
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    overview: project?.overview,
    github: project?.github,
    website: project?.website,
    projectImage: ""
  });

  useEffect(() => {
    if (projectData.projectImage) {
      const fileType = projectData.projectImage.type;
      if (fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg") {
        setImageFileStatus(true);
        setPreview(URL.createObjectURL(projectData.projectImage));
      } else {
        setImageFileStatus(false);
        setPreview("");
        setProjectData({ ...projectData, projectImage: "" });
      }
    }
  }, [projectData.projectImage]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImage: ""
    });
  };

  const handleShow = () => {
    setShow(true);
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImage: ""
    });
  };

  const handleupdateproject = async () => {
    const { id, title, languages, overview, github, website, projectImage } = projectData;
    if (title && languages && overview && github && website) {
      const reqbody = new FormData();
      reqbody.append("title", title);
      reqbody.append("languages", languages);
      reqbody.append("overview", overview);
      reqbody.append("github", github);
      reqbody.append("website", website);
      preview ? reqbody.append("projectImage", projectImage) : reqbody.append("projectImage", project?.projectImage);

      const token = sessionStorage.getItem("token"); // Ensure token is retrieved here
      if (token) {
        const reqheader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await editprojectapi(id, reqbody, reqheader);
          if (result.status === 200) {
            alert("Project updated successfully");
            handleClose();
            seteditresponse(result);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill the form completely");
    }
  };

  return (
    <>
      <button onClick={handleShow} className='btn'><i className='fa-solid fa-edit'></i></button>
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
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
                <img height={'200px'} className='img-fluid' src={preview ? preview : `${serverurl}/uploads/${project?.projectimage}`} alt="" />
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
          <Button onClick={handleupdateproject} variant='primary'>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
