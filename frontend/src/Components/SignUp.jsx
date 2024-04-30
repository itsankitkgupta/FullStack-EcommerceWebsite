// SignUp.js


function SignUp() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="form-input mt-1 block w-full" placeholder="Enter your username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="form-input mt-1 block w-full" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="form-input mt-1 block w-full" placeholder="Enter your password" />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
                    </div>
                </form>
                <p className="text-sm text-gray-600">Already have an account? <a href="#" className="text-blue-500">Sign in</a></p>
            </div>
        </div>
    );
}

export default SignUp;
