import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

function Cart() {

    const { id } = useParams("");
    //console.log(id);

    const { account, setAccount } = useContext(LoginContext);



    const history = useNavigate("");

    const [result, setResult] = useState("");

    const getDataOfId = async () => {
        try {
            const data = await fetch(`http://localhost:8005/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const res = await data.json();
            setResult(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        setTimeout(getDataOfId,1000)
    }, [id]);

    //add cart function 
    const addtoCart = async (id) => {
        console.log(id);
        const checkres = await fetch(`http://localhost:8005/addcart/${id}`, {
            method: "POST",
            mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Send only the id in the request
            credentials: "include" // Include credentials to allow cookies
        });

        const data1 = await checkres.json();
        // console.log("frontend data")
        //console.log(data1);//frontend data

        if (checkres.status === 401 || !data1) {
            console.log("User invalid");
            alert("User invalid");
        } else {
            // alert("Data added in your cart");
            history("/buy-now")
            setAccount(data1)

        }

    };



    return (
        <div className='cart_section'>
            {result && Object.keys(result).length &&


                <div className="container flex justify-between">
                    <div className="left_part_container w-[50%]  ">
                        <div className="image flex justify-center m-5">
                            <img src={`${result.url}`} alt="Cart-image" className='w-[25vw]' />
                        </div>

                        <div className="buttons flex gap-2 justify-center m-5">
                            <button className='bg-yellow-400 p-2 w-[15vw] rounded-2xl hover:bg-yellow-500' onClick={() => addtoCart(result.id)}>Add to Cart</button>
                            <button className='bg-orange-400 p-2 w-[15vw] rounded-2xl hover:bg-orange-500'>Buy Now</button>
                        </div>

                    </div>
                    <div className="right_part_container border-2 w-[50%] m-5">
                        {result.title && (
                            <div className='font-bold text-2xl m-2'>{result.title.shortTitle}</div>
                        )}
                        {result.title && (
                            <div className='m-1'>{result.title.longTitle}</div>
                        )}
                        <hr className="my-1 h-0.5 border-t-0 bg-black opacity-80 dark:opacity-50 " />
                        <div className='m-3'>

                            {result.price && (
                                <div className='mrp flex'>M.R.P. : ₹{result.price.mrp}</div>
                            )}

                            {result.price && (
                                <p className='flex'>Deal of the Day : <span className=' text-red-600'>₹{result.price.cost}</span></p>
                            )}

                            {result.price && (
                                <p className='flex'>You save : : <span className=' text-red-600'>₹{result.price.mrp - result.price.cost}  ({result.price.discount})</span></p>
                            )}
                        </div>
                        <div className="discount m-3">
                            <div className='flex text-red-600'>
                                Discount : <span className='text-black mx-1'>{result.price.discount}</span>
                            </div>
                            <div className='flex text-blue-700'>Free Delivery :<span className='text-gray-800 mx-1'> Oct 8 - 21</span> Details</div>
                            <p className='flex my-3'>Fastest delivery : <span className='text-gray-800 font-bold mx-1'>Tomorrow 11am</span></p>
                            <div className='description flex my-2'>
                                <div className='flex font-bold w-full'>About the Item : </div>
                                <div className='flex justify-start'>{result.description}</div>
                            </div>
                        </div>

                    </div>
                </div>
            }

            {
                (!result ? (<div className='circle w-[100%] h-[100vh] flex justify-center items-center'>
                <CircularProgress/>
                <h2 className='text-2xl font-bold m-3'>Loading...</h2>
              </div>):(""))
            }
        </div>

    )
}

export default Cart