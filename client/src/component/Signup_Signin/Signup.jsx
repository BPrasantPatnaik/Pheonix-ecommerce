import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const history = useNavigate("");

    const [data,setData]=useState({
        name:"",
        email:"",
        number:"",
        password:"",
        cpassword:""
    })
    //console.log(data)

    const addedvalue=(e)=>{
        const {name,value}=e.target;
        setData(()=>{
            return{
                ...data,
                [name]:value
            }
        })
    }

    const setdata=async(e)=>{
        e.preventDefault();
        const {name,email,number,password,cpassword}=data;

        if(name === ""){
            toast.warn('Fill Your Name !', {
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true,
                });
        }
        if(email === ""){
            toast.warn('Fill Your Email !', {
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true,
                });
        }
        if(number === ""){
            toast.warn('Fill Your Number !', {
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true,
                });
        }
        if(password === ""){
            toast.warn('Fill Your Password !', {
                position: "top-center",
                autoClose: 5000,
                closeOnClick: true,
                });
        }

        const res = await fetch("http://localhost:8005/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,number,password,cpassword
            })
        });

        const Data=await res.json();
        console.log(Data); 


        if(res.status === 422 || !Data){
           // alert("No Data");
           toast.warn('NO Data Available !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        else{
            //alert("Data Successfully Added");

            toast.success('Data Successfully Added !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
            setData({...data,name:"",
            email:"",
            number:"",
            password:"",
            cpassword:""})

            history("/login")
        }

    }

    return (
        <>
        <section>
            <div className="signin_container w-[40%] m-auto  pb-[30vh] pt-[5vh]">
                <div className="sign_header w-[10vw] m-auto">
                    <img src="/image-removebg-preview.png" alt="Logo" />
                </div>
                <div className="sign_form  border-3 p-3 rounded-sm">
                    <form method='POST'>
                        <h1 className='font-bold text-3xl'>Create account</h1>
                        <div className="form_data p-2  flex-col justify-left ml-[7%]">
                            <label htmlFor="name" className='flex font-semibold'>Your name</label>
                            <input type="text"
                            onChange={addedvalue} value={data.name}  name="name" id="name" className='flex w-[90%] border-2 rounded-sm'/>
                        </div>
                        <div className="form_data p-2  flex-col justify-left ml-[7%]">
                            <label htmlFor="email" className='flex font-semibold'>Email</label>
                            <input type="email"
                            onChange={addedvalue} value={data.email} placeholder='xyz@gmail.com' name="email" id="email" className='flex w-[90%] border-2 rounded-sm'/>
                        </div>
                        <div className="form_data p-2  flex-col justify-left ml-[7%]">
                            <label htmlFor="number" className='flex font-semibold'>Mobile number</label>
                            <input type="number"
                            onChange={addedvalue} value={data.number} name="number" id="number" className='flex w-[90%] border-2 rounded-sm'/>
                        </div>
                        <div className="form_data p-2 flex-col justify-left ml-[7%]">
                            <label htmlFor="password" className='flex font-semibold'>Password</label>
                            <input type="password"
                            onChange={addedvalue} value={data.password} placeholder='Atleast 6 characters' name="password" id="password" className='flex w-[90%] border-2 rounded-sm' />
                        </div>
                        <div className="form_data p-2 flex-col justify-left ml-[7%]">
                            <label htmlFor="password" className='flex font-semibold'>Password again</label>
                            <input type="password"
                            onChange={addedvalue} value={data.cpassword} name="cpassword" id="cpassword" className='flex w-[90%] border-2 rounded-sm' />
                        </div>
                        <button className='p-2 flex  ml-[9%] bg-yellow-300 w-[80%] justify-center border-2 rounded-md hover:bg-yellow-400' onClick={setdata}>Continue</button>
                    </form>
                    <ToastContainer />
                    <div className="Having_account m-5 flex gap-x-2">
                    <p>Already have an account ?</p>
                    <NavLink to="/login" className="text-blue-700">Sign-in</NavLink>
                </div>
                </div>
                
                
            </div>
        </section>
        </>
      )
}

export default Signup