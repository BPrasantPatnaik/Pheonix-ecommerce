import React from 'react'

function Footer() {
    const year=new Date().getFullYear();
    return (
        <footer>
            <div className="footer_container flex justify-center gap-x-[10vw] p-5 bg-blue-800 text-white">
                <div className="footer_details flex-col justify-center">
                    <h3 className='font-bold pb-3'>Get to Know us</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                </div>
                <div className="footer_datails flex-col justify-center">
                    <h3 className='font-bold pb-3'>Contact Us</h3>
                    <p>Facebook</p>
                    <p>Linked in</p>
                    <p>Twitter</p>
                    <p>Instagram</p>

                </div>
                <div className="footer_datails flex-col justify-center px-0.5">
                    <h3 className='font-bold pb-3'>Make money with us</h3>
                    <p>Facebook</p>
                    <p>Linked in</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>

            </div>
            <div className='Last_footer_part bg-blue-950  p-3'>
               
                    <img src="/image-removebg-preview.png" alt="Logo"  className='w-[5vw] m-1 relative left-[50%]'/>
                
                <p className='text-white flex justify-center gap-x-[10vw]'>
                    <p>Condition of Use and sale</p>
                    <p>Privacy Notice</p>
                    <p>Interest-Based ads</p>
                    <div>&#169;2022-{year} Phoenix.com inc. or its affiliates</div>
                </p>

            </div>
        </footer>
    )
}

export default Footer