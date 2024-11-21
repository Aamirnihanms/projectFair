import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { Row, Col } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { allprojectsapi } from '../services/aalApi';

function Projects() {
  const [searchkey, setsearchkey] = useState("");
  const [allprojects, setallprojects] = useState([]);

  useEffect(() => {
    getallprojects();
  }, [searchkey]);

  const getallprojects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await allprojectsapi(searchkey, reqheader);
        console.log(result);
        if (result.status === 200) {
          setallprojects(result.data);
        } else {
          console.log(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Projects</h1>
          <input onChange={e => setsearchkey(e.target.value)} type="text" placeholder="search projects by language" className='form-control w-25' />
        </div>
        <Row className="mt-3">
          {allprojects?.length > 0 ? (
            allprojects?.map((project, index) => (
              <Col key={project.id || index} className='mb-3' sm={12} md={6} lg={4}>
                <ProjectCard displayData={project} />
              </Col>
            ))
          ) : (
            <div className='fw-bolder text-danger m-5 text-center'>project not found</div>
          )}
        </Row>
      </div>
    </>
  );
}

export default Projects;
