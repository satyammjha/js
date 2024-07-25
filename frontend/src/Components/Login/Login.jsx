import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 ml-[3%]  md:ml-[35vw]">
            <h1 className="text-[2rem] md:text-3xl mb-6 font-bold text-center">Please enter your credential</h1>
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    className="bg-none p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter userid"
                />
                <input
                    type="password"
                    className="bg-none p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                />
                <Link to='/Apix3873'>
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;