import { React, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { LoginContext } from '../context/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function Navbar() {

    const { account, setAccount } = useContext(LoginContext);
    //console.log("In nav bar")
    //console.log(account.carts.length);


    const [text, setText] = useState("");
    console.log(text)
    const [liopen, setLiopen] = useState(true);

    const { products } = useSelector(state => state.getproductsdata);



    const history = useNavigate("");

    //this is for menu we have used
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    //end of lines for menu

    const validUSer = async () => {

        const checkres = await fetch(`http://localhost:8005/validUser`, {
            method: "GET",
            mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include" // Include credentials to allow cookies
        });

        const data1 = await checkres.json();
        console.log(data1);
        if (checkres.status === 401 || !data1) {
            console.log("User invalid");
            alert("User invalid");
        } else {


            setAccount(data1)

        }
    };

    const logoutUser = async () => {

        const checkres = await fetch(`http://localhost:8005/logout`, {
            method: "GET",
            mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include" // Include credentials to allow cookies
        });

        const data1 = await checkres.json();
        console.log(data1);
        if (checkres.status === 401 || !data1) {
            console.log("User invalid");
            alert("User invalid");
        } else {

            toast.success(`User successfully Logged Out !`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setAccount("")
            history("/")
        }
    };

    const getText = (items) => {
        setText(items)
        setLiopen(false)
    }

    useEffect(() => {

        validUSer()
    }, [])


    return (
        <>
            <header className='bg-slate-800 flex justify-between p-[2vh] '>
                <div className='left flex justify-start gap-x-[5vw]'>
                    <NavLink to="/">
                        <div className='bg-no-repeat w-[6vw] h-[5vh] mx-[2vw] relative '>
                            <img src="/image-removebg-preview-removebg-preview.png" alt="Logo" />
                        </div>
                    </NavLink>

                    <div className='flex'>
                        <div>
                            <div className='flex'>
                                <input type="search" name="" id=""
                                    onChange={(e) => getText(e.target.value)}
                                    placeholder='Search' className='bg-[#f5f5f5] rounded-md w-[30vw] h-[5vh]  p-1' />
                                <div className='search_icon bg-yellow-500 w-[3vw] h-[5vh] mx-0.5 rounded-md '>
                                    <SearchIcon />
                                </div>
                            </div>


                            {/*Search filter*/}

                            {
                                text &&
                                <div style={{ position: 'relative' }}>
                                    <List className='bg-white m-1 rounded-lg' style={{ position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '200px', overflow: 'auto', zIndex: 999 }}>
                                        {products
                                            .filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
                                            .map(filteredProduct => (
                                                <ListItem key={filteredProduct.id}>
                                                    <NavLink to={`/getproductsone/${filteredProduct.id}`} onClick={() => setText("")}>
                                                    {filteredProduct.title.longTitle}
                                                    </NavLink>
                                                    
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            }

                        </div>

                    </div>

                </div>
                <div className='right text-white flex justify-end mr-[5vw]'>
                    {
                        account ? "" : <NavLink to="/login" >Sign in</NavLink>

                    }

                    <div className='cart_btn mx-[2vw] flex'>
                        {
                            account ?
                                <NavLink to="/buy-now">
                                    <Badge badgeContent={account.carts.length} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink>
                                :
                                <NavLink to="/login">
                                    <Badge badgeContent={0} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink>
                        }


                        <div>Cart</div>
                    </div>
                    {
                        account ? <Avatar style={{ backgroundColor: "#2563EB" }} className='Avatar2'
                            //the below lines are for onclick menu over avatar
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        //upto this line for onclick menu over avatar
                        >{account.name[0].toUpperCase()}</Avatar>
                            : <Avatar className='avatar '
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} />
                    }

                    <form action="">
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            {
                                account ? <MenuItem onClick={() => { handleClose(); logoutUser() }}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem>
                                    :
                                    ""

                            }

                        </Menu>
                    </form>
                    <ToastContainer />


                </div>
            </header>

        </>
    )
}

export default Navbar