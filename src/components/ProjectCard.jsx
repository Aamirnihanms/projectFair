import React from 'react'
import { useState } from 'react'
import { Card,Modal } from 'react-bootstrap'
import projectimg from '../assets/projectcard.jpg'
import serverurl from '../services/serverUrl'



function ProjectCard({displayData}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className='shadow btn'>
      <Card.Img height={'200px'} variant="top" src={`${serverurl}/uploads/${displayData?.projectimage}`} />
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
               <img className='img-fluid' src={`${serverurl}/uploads/${displayData?.projectimage}`}  alt="" />
            </div>
            <div className="col-lg-6">
               <h1>{displayData?.title}</h1>
               <h6><span className='fw-bolder'>languages used:</span><span className='text-danger'>{displayData?.languages}</span></h6>
               <p style={{textAlign:"justify"}}><span className='fw-bolder'> clasProject Overview:</span>{displayData
               ?.overview}</p>
            </div>
          </div>
          <div className='float-start'>
            <a className='btn btn-secondary ' href={displayData?.github} target='-_lank'><i class="fa-brands fa-github"></i></a>
            <a className='btn btn-secondary ms-2' href={displayData.website} target='_blank'><i class="fa-solid fa-link"></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard