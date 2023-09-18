import React, { useState } from 'react';
import registrationImg from '../../assets/images/registration.png';
import {RiEyeCloseFill,RiEyeFill} from 'react-icons/ri';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Registration = () => {
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [fullNameErr, setFullNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [passwordShow, setPasswordShow] = useState(false);
  
  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailErr(''); 
  }
  const handleFullName = (e) =>{
    setFullName(e.target.value);
    setFullNameErr('');

  }
  const handlePassword = (e) =>{
    setPassword(e.target.value);
    setPasswordErr('');
  }

  const handleSubmit = () =>{
    if(!email){
      setEmailErr('Please Enter Your E-Mail');
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailErr('Please Enter Your Valid E-Mail');
      }
    }
    if(!fullName){
      setFullNameErr('Please Enter Your Full Name');
    }
    if(!password){
      setPasswordErr('Please Enter Your Password');
    }else{
      if(!(password)){
        setPasswordErr('Must used one lowercase,uppercase,symbols and total 8 characters');
      }
    }
    if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      createUserWithEmailAndPassword(auth, email, password).then(()=>{
        console.log('done');
        sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success('Registration successful. Please verify your e-mail');
          setEmail('');
          setFullName('');
          setPassword('');
          setPasswordShow(false);
          passwordShow();
        });

      }).catch((error)=> {
        if(error.code.includes('auth/weak-password')){
          setPasswordErr('please give a strong password')
        
        }
        if(error.code.includes('auth/email-already-in-use')){
          setEmailErr('This email already exists')
        }
        })
      }
    }
  

  

  const inputStyle = 'w-96 py-6 px-12 rounded-lg border border-solid border-[#b8b9ce]   text-[#11175D] font-nunito text-lg font-semibold    focus:outline-none focus:border-[#11175D] focus:ring-2 focus:ring-[#11175D] mb-8'

  const inputName= 'absolute top-0 left-0 py-3 mx-8 px-4 bg-white    text-[#585d8e] font-nunito text-sm font-semibold tracking-[1.03px]  translate-y-[-50%]'

  const error = 'absolute  top-[85px] left-0 px-12 rounded bg-red-500 w-96 text-white font-nunito text-base font-bold'

  return (
    <>
        <div className='flex items-center'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
            <div className='flex justify-end w-1/2 mr-20'>
            <div className=''>
              <h1 className='text-[#11175D] font-nunito text-[34px] font-bold mb-1'>{success}</h1>
              <h2 className='text-[#11175D] font-nunito text-[34px] font-bold mb-1'>Get started with easily register</h2>
              <h3 className='text-[#808080] font-nunito text-xl font-normal mb-10'>Free register and you can enjoy it</h3>
              <div className='relative'>
              <input value={email} onChange={handleEmail} className={`  ${inputStyle}`} type='email' placeholder='Enter your E-mail'/>
              <p className={`  ${inputName}`}>Email Address</p>
              {
                emailErr && 
                <p className= {`  ${error}`}>{emailErr}</p>
              }
              </div>
              <br></br>
              <div className='relative'>
              <input value={fullName} onChange={handleFullName} className={`  ${inputStyle}`} type='text' placeholder='Enter your Full-Name'></input>
              <p className={`  ${inputName}`}>Full-Name</p>
              {
                fullNameErr && 
                <p className= {`  ${error}`}>{fullNameErr}</p>
              }
              </div>
              <br></br>
              <div className='relative'>
              <input value={password} onChange={handlePassword} className={` mb-2 ${inputStyle}`} type={passwordShow ? 'text' : 'password' } placeholder='Enter your Password'></input>
              <p className={inputName} >Password</p>

              {
                passwordShow ? <RiEyeFill onClick={ ()=> setPasswordShow(!passwordShow)} className='absolute top-[33px] right-[125px]'/>
                :
              <RiEyeCloseFill onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[33px] right-[125px] '/>
              }
              {
                passwordErr && 
                <p className= {`  ${error}`}>{passwordErr}</p>
              }
              </div>
              <br></br>
              
              <button onClick={handleSubmit} className=' w-96 py-5 rounded-[86px] bg-[#5F35F5]  text-white font-nunito text-xl font-semibold'>Sign up</button>

              <h4 className='w-96 text-center text-[#03014C] font-sans text-sm font-normal mt-3'>Already  have an account ? <span className='text-[#EA6C00] font-sans text-sm font-bold'>Sign In</span></h4>
            </div>
            </div>
            <img className='object-cover w-1/2 h-screen' src={registrationImg} alt="registration" />
        </div>
    
    </>
  )
}

export default Registration