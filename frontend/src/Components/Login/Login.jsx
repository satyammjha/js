import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <h1 className="text-[30px] ml-[36vw] underline" >Please enter your credentials</h1>
            <div className="flex flex-col gap-4 ml-[38vw] mt-5 align-middle">
                <input className="bg-none p-2 rounded-md w-[25vw]" placeholder="enter userid" />
                <input className="bg-none p-2 rounded-md w-[25vw]" placeholder="enter password" />
                <Link to='/Apix3873'><button className="w-[10vw] ml-[6vw]">Login</button></Link>
            </div>
        </>
    )
}

export default Login;