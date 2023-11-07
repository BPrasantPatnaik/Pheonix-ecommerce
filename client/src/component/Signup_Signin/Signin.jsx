import React, { useState,useContext } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {


    const history = useNavigate("");

    const {account,setAccount}=useContext(LoginContext);

    const [data,setData]=useState({
        email:"",
        password:""
        
    });

    //console.log(data)
    const addedvalue=(e)=>{

        const {name,value}=e.target;
        setData(()=>{
            return {
                ...data,
                [name]:value
            }
            
        })
    }

    const getData=async(e)=>{
        e.preventDefault();
        const {email,password}=data;

        if(email === ""){
            toast.warn('Fill Your Email !', {
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

        const res = await fetch("http://localhost:8005/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const Data=await res.json();
        //console.log(Data);
        if(!Data.error){
            setAccount(Data);
            
                // console.log("VALID DATA");
                toast.success(`Welcome,You have successfully Logged In !`, {
                 position: "top-center",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
                 });
                 history("/")
        }
        else{
            toast.warn('INVALID DATA ! Enter valid Data', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setData({ email:"",password:""})
            history("/login")
        }
        

        

    }

  return (
    <>
    <section>
        <div className="signin_container w-[40%] m-auto  pb-[30vh] pt-[5vh]">
            <div className="sign_header w-[30vw] m-auto">
                <img src="/image-removebg-preview.png" alt="Logo" />
            </div>
            <div className="sign_form  border-3 p-3 rounded-sm">
                <form method='POST'>
                    <h1 className='font-bold text-3xl'>Sign-In</h1>
                    <div className="form_data p-2  flex-col justify-left ml-[7%]">
                        <label htmlFor="email" className='flex font-semibold'>Email</label>
                        <input type="email"
                        onChange={addedvalue}
                        value={data.email}
                        placeholder='xyz@gmail.com' name="email" id="email" className='flex w-[90%] border-2 rounded-sm'/>
                    </div>
                    <div className="form_data p-2 flex-col justify-left ml-[7%]">
                        <label htmlFor="password" className='flex font-semibold'>Password</label>
                        <input type="password"
                        onChange={addedvalue}
                        value={data.password}
                         placeholder='Atleast 6 characters' name="password" id="password" className='flex w-[90%] border-2 rounded-sm' />
                    </div>
                    <button className='p-2 flex  ml-[9%] bg-yellow-300 w-[80%] justify-center border-2 rounded-md hover:bg-yellow-400' onClick={getData}>Continue</button>
                </form>
                <ToastContainer />
            </div>
            <div className='create_accountinfo '>
                <p className='m-3'>New To Pheonix ?</p>
                <NavLink to="/register">
                <button className='bg-slate-300 p-1 w-[70%] rounded-md text-slate-950 hover:bg-slate-400 border-3 border-slate-500'>Create Your Pheonix account</button>
                </NavLink>
                
            </div>
        </div>
    </section>
    </>
  )
}

export default Signin