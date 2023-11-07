import React, { useEffect, useState, useContext } from 'react';
import Option from './Option';
import Subtotal from './Subtotal';
import Right_side from './Right_side';
import { LoginContext } from '../context/ContextProvider';

function Buynow() {
    const [cartdata, setCartdata] = useState([]);
    const { account } = useContext(LoginContext);

    useEffect(() => {
        if (account && account.carts && account.carts.length > 0) {
            setCartdata(account.carts);
            //console.log(cartdata);
        }
    }, [account]);

    return (
        <>
            {cartdata.length > 0 ? (
                <div className="buynow_section">
                    <div className="buynow-container flex justify-between  ">
                        <div className="left_buy m-5 px-3 pt-3 w-[70%] bg-white ">
                            <p className='flex text-3xl font-bold'>Shopping Cart</p>
                            <p className='flex my-2 text-blue-600'>Select all items</p>
                            <span className='flex justify-end my-2'>Price</span>
                            <hr className="my-2 h-0.5 border-t-0 bg-black opacity-80 dark:opacity-50 " />
                            {cartdata.map((item, index) => (
                                <>
                                <div className="item-container flex justify-between gap-x-2 " key={index}>
                                    <div className="left-item w-[30%] m-5">
                                        <img src={item.url} alt="item-photo" />
                                    </div>
                                    <div className='right-item flex justify-between w-[75%]'>
                                        <div className='right-container-left w-[90%]'>
                                            <div className='flex justify-start text-left font-semibold text-xl'>{item.title.longTitle}</div>
                                            <div className='flex font-semibold text-xl my-3'>{item.title.shortTitle}</div>
                                            <div className='text-orange-500 flex'>Usually dispatched in 8 days</div>
                                            <div className='flex'>Eligible for FREE Shipping</div>
                                            <Option deleteData={item.id}/>
                                        </div>
                                        <div className=' right-container-right w-[10%] text-xl'>
                                            <div className='flex justify-end font-bold '>₹{item.price.mrp}.00</div>
                                        </div>

                                    </div>
                                </div>
                                <div></div>
                                 <hr className="my-2 h-0.5 border-t-0 bg-black opacity-80 dark:opacity-30" />
                                </>
                                
                            ))}
                            
                            <Subtotal item={cartdata}/>
                        </div>
                        <div className="right_buy w-[30%]">
                            <Right_side item={cartdata} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className='flex justify-center items-center m-[20vh] text-5xl font-serif'>No items in the cart.</p>
            )}
        </>
    );
}

export default Buynow;
