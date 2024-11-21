import React from 'react'

function Footer() {
  return (
    <>
    <div  className='w-100 shadow px-5 mt-5 py-3 rounded'>
    <style>
        {`
          .btn-outline-white {
            background-color: transparent;
            border: 1px solid white;
            color: white;
          }

          .btn-outline-white:hover {
            background-color: white;
            color: black;
          }

          .text-white {
            color: white;
          }

          .footerlink {
            text-decoration: none;
          }
        `}
      </style>
  <div className='d-flex justify-content-between'>
    <div className="intro">
      <h5 className='text '><i className="fa-solid fa-headphones me-3 text"></i>
      Media Player</h5>
      <p>Design and build with all the love in the world by Aamir Nihan MS.</p>
      <p>Code licensed Aamir, docs CC BY 3.0.</p>
      <p>Currently v5.3.2.</p>
    </div>
    <div className="links">
      <h5 className='text'>Links</h5>
      <a className='footerlink ' style={{textDecoration:'none'}}>Landing Pages</a> <br />
      <a className='footerlink ' style={{textDecoration:'none'}}>Home Pages</a> <br />
      <a className='footerlink ' style={{textDecoration:'none'}}>Watch History Pages</a>
    </div>
    <div className="guides">
      <h5 className='text'>Guides</h5>
      <p>React</p>
      <p>React Bootstrap</p>
      <p>React Router</p>
    </div>
    <div className="contact">
      <h5 className='text-white'>Contact Us</h5>
      <div className='d-flex'>
        <input type="text" className='form-control me-3' placeholder='Enter your email here'/>
        <button className='btn btn-outline-black rounded p-1'><i className="fa-solid fa-arrow-right"></i></button>

      </div>
      <div className='d-flex flex-row justify-content-evenly mt-4'>
        <i className="fa-brands fa-twitter text-white"></i>
        <i className="fa-brands fa-instagram text-white"></i>
        <i className="fa-brands fa-facebook text-white"></i>
        <i className="fa-brands fa-linkedin text-white"></i>
        <i className="fa-brands fa-github text-white"></i>
        <i className="fa-solid fa-phone text-white"></i>
      </div>
    </div>
  </div>
  <p className='text-center mt-3 text-white'>Copyright ©Aamir Productions, Media Player. Built with React</p>
</div>

    </>
  )
}

export default Footer