import React, { useState, useEffect, useContext } from 'react';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { deleteprojectapi, userprojectsapi } from '../services/aalApi';
import { addresponsecontext, editresponsecontext } from '../context/ContextShare';

function View() {
  const {editresponse,seteditresponse} =useContext(editresponsecontext)
  const { addresponse, setaddresponse } = useContext(addresponsecontext);
  const [userprojects, setuserprojects] = useState([]);

  useEffect(() => {
    getuserprojects();
  }, [addresponse,editresponse]);

  const getuserprojects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await userprojectsapi(reqheader);
        console.log(result);
        if (result.status === 200) {
          setuserprojects(result.data);
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handledeleteproject = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await deleteprojectapi(pid, reqheader);
        console.log(result);
        if (result.status === 200) {
          getuserprojects();
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between mt-2'>
        <h2 className='text-warning'>All Projects</h2>
        <div><Add /></div>
      </div>
      <div className="mt-2">
        {userprojects?.length > 0 ? (
          userprojects.map(project => (
            <div key={project?._id} className="border rounded p-2 mb-3 d-flex justify-content-between">
              <h3>{project?.title}</h3>
              <div className="d-flex align-items-center">
                <div><Edit project={project} /></div>
                <div className="btn"><a href={project?.github}><i className='fa-brands fa-github'></i></a></div>
                <button onClick={() => handledeleteproject(project?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
              </div>
            </div>
          ))
        ) : (
          <div>project not found</div>
        )}
      </div>
    </>
  );
}

export default View;
