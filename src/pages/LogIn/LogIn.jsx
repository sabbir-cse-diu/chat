import React, { useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import googleLogo from '../../assets/images/googleLogo.png'
import {RiEyeCloseFill,RiEyeFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'


const LogIn = () => {

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

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
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)){
            setPasswordErr('Must used one lowercase,uppercase,symbols and total 8 characters');
        }
        }
    }

    const inputStyle = 'w-96 py-6 border-b border-solid border-[#b8b9ce]   text-[#11175D] font-nunito text-lg font-semibold    focus:outline-none focus:border-b-[#11175D] focus:ring-b-2 focus:ring-b-[#11175D] mb-8'

    const inputName= 'absolute top-0 left-0 py-3 text-[#585d8e] font-nunito text-sm font-semibold tracking-[1.03px]  translate-y-[-50%]'

    const error = 'absolute  top-[85px] left-0 px-12 rounded bg-red-500 w-96 text-white font-nunito text-base font-bold'

    return (
        <>
            <div className='flex items-center'>
                <div className='flex justify-end w-1/2 mr-20'>
                <div className=''>
                <h2 className='text-[#11175D] font-nunito text-[34px] font-bold mb-1'>Login to your account!</h2>
                <div className='w-60 flex my-8 py-6 rounded-lg border border-solid border-[#b8b9ce] cursor-pointer '>
                    <img className='me-2.5 ps-8' src={googleLogo} alt="googleLogo" />
                    <p className='text-[#03014C] font-sans text-sm font-semibold '>Login with Google</p>

                </div>
                <div className='relative'>
                <input onChange={handleEmail} className={`  ${inputStyle}`} type='text' placeholder='Enter your E-mail'/>
                <p className={`  ${inputName}`}>Email Address</p>
                {
                    emailErr && 
                    <p className= {`  ${error}`}>{emailErr}</p>
                }
                </div>
                <br></br>
                <div className='relative'>
                <input onChange={handlePassword} className={` mb-2 ${inputStyle}`} type={passwordShow ? 'text' : 'password' } placeholder='Enter your Password'></input>
                <p className={inputName} >Password</p>

                {
                    passwordShow ? <RiEyeFill onClick={ ()=> setPasswordShow(!passwordShow)} className='absolute top-[33px] right-[30px]'/>
                    :
                <RiEyeCloseFill onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[33px] right-[30px] '/>
                }
                {
                    passwordErr && 
                    <p className= {`  ${error}`}>{passwordErr}</p>
                }
                </div>
                <br></br>
                <button onClick={handleSubmit} className=' w-96 py-5 rounded-[8px] bg-[#5F35F5]  text-white font-nunito text-xl font-semibold'>Login to Continue</button>
                <h4 className='w-96 text-[#03014C] font-sans text-sm font-normal mt-3'>Don’t have an account ? <span className='text-[#EA6C00] font-sans text-sm font-bold'>Sign up</span></h4>
                </div>
                </div>
                <img className='object-cover w-1/2 h-screen' src={loginImg} alt="registration" />
            </div>
        
        </>
    )
}

export default LogIn