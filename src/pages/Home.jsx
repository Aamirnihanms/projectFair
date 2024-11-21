import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import profileicon from '../assets/profileicon1.jpg'
import landing1 from '../assets/landing6.png'
import { homeprojectsapi } from '../services/aalApi'

function Home() {

  const [allhomeprojects,setallhomeprojects] = useState([])
 const navigate = useNavigate()

 console.log(allhomeprojects)

 useEffect(()=>{
  getallhomeprojects()
 },[])

 const getallhomeprojects = async () => {
  try {
    const result = await homeprojectsapi();
    if (result.status === 200) {
      setallhomeprojects(result.data);
    } else {
      console.log(`Unexpected response status: ${result.status}`);
    }
  } catch (err) {
    console.error('Error fetching home projects:', err);
  }
};


  const handleprojects =()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert('please login in to get full access to our page!!!')
    }
  }


  return (
    <>
    <div style={{minHeight:"100vh"}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h1 style={{fontSize:"80px"}}><i className='fa-brands fa-docker'></i>Project Fair</h1>
                    <p style={{textAlign:"justify"}}>
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta quasi, accusamus quibusdam suscipit earum necessitatibus quod, aliquam illo sint perspiciatis rem odio ipsa consequatur eos! Minus officia harum expedita maiores.
                    </p>
                 {sessionStorage.getItem("token")?
                    <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                 :
                 <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
                 }
                </div>
                <div className="col-lg-6">
                    <img className='img-fluid' src={landing1} alt="" />
                </div>
            </div>
        </div>
    </div>
    <div className='my-5 text-center'>
        <h1 className='mb-5'>ExploreOur Projects</h1>
        <marquee>
            <div className='d-flex'>
            {allhomeprojects?.length > 0 &&
  allhomeprojects.map((project, index) => (
    <div key={project.id || index} className='me-5'>
      <ProjectCard displayData={project} />
    </div>
  ))
}

            </div>
        </marquee>
        <button onClick={handleprojects} className='btn btn-link mt-5'>click here to view more projects...</button>
    </div>
    <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={"80px"} height={'80px'} className='rounded-circle img-fluid mb-2' src={profileicon} alt="" />
            <span>Lucia</span>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={"80px"} height={'60px'} className='rounded-circle img-fluid mb-2' src={profileicon} alt="" />
            <span>Lucia</span>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={"80px"} height={'60px'} className='rounded-circle img-fluid mb-2' src={profileicon} alt="" />
            <span>Lucia</span>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
        </div>
    </div>
    </>
  )
}

export default Home