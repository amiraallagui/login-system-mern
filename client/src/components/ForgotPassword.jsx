import React, { useContext } from 'react'
import {  useState } from 'react';
import '../App.css';
import logo from '../assets/images/logo-2-amira.png';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
const login_url = process.env.REACT_APP_HOST_NAME+'api/forgot-password';


function ForgotPassword() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage ,setErrorMessage] = useState("");
    const [successMessage ,setSuccessMessage] = useState("");
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(["access_token"])
    
    const { state, dispatch } = useContext(AuthContext);

    async function getUserMail(event) {
           event.preventDefault();
           setErrorMessage("");
           setSuccessMessage("");
                axios.post(login_url,
                            {
                            email: email,
                            },
                            {
                            headers:{"Content-Type":'application/json'},
                            })
                    .then((response) => {
                        // console.log(response.data);
                        setSuccessMessage(response.data.message)
                        setName("")
                        setEmail("")
                        setPassword("")
                        navigate("/link-verification")
                    })
                    .catch((error) => {
                        // console.error(error.response.data.error);

                        setErrorMessage(error.response.data.error)
                        setEmail("")
                        const timeout = setTimeout(() => {
                            setErrorMessage('');
                          }, 1500);
                      
                          return () => {
                            clearTimeout(timeout);
                          };
                    })
           
    }


  return (
    <div className='rectangle'>
        <div className='group'> 
            <div className="logo">
                <img src={logo} alt="LOGO" />
            </div> 
           
                
            <form onSubmit={getUserMail} className="form-control-register">

                {
                    successMessage &&  <div className="notifications-container">
                                <div className="success-message">
                                    <div className="flex">
                                        <div className="error-prompt-container">
                                            <p className="success-prompt-heading">{successMessage} </p>          
                                        </div>
                                    </div>
                                </div>
                    </div> 
                }
                {
                    errorMessage &&  <div className="notifications-container">
                                            <div className="error-alert">
                                                <div className="flex">
                                                    <div className="error-prompt-container">
                                                        <p className="error-prompt-heading">{errorMessage} </p>          
                                                    </div>
                                                </div>
                                            </div>
                                      </div> 
                }
               
                
  
               <div className="notifications-container">
                            <p className='instruction-heading'>write your email account here</p>
               </div>

                <div className='control-div'>
                    <input 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" 
                        name='email'/>
                    <label htmlFor='email'>
                        <span style={{ transitionDelay: '350ms' }}>E</span>
                        <span style={{ transitionDelay: '300ms' }}>m</span>
                        <span style={{ transitionDelay: '250ms' }}>a</span>
                        <span style={{ transitionDelay: '200ms' }}>i</span>
                        <span style={{ transitionDelay: '150ms' }}>l</span>
                    </label>
                </div>
               
              
                <button type='submit'>Send Email</button>

                <div className="password-policy">
                    <Link></Link>
                    <Link to='/login' className="policy-link-register" >login</Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default ForgotPassword
