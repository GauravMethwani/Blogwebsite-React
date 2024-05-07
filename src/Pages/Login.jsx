import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebaseconfig'; // Import the Firebase authentication instance
import { Link,useNavigate } from 'react-router-dom'; // Import Link for routing
import Message from '../Components/Message';

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowSuccessModal(true);
            onLogin()
            setError(null);
        } catch (error) {
            // Handle specific error codes returned by Firebase
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-email':
                    setError('Invalid email.');
                    break;
                case 'auth/wrong-password':
                    setError('Invalid password.');
                    break;
                default:
                    setError('Invalid Email and Password');
                    break;
            }
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                    {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='m-1 p-1'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-4"
                            />
                        </div>
                        <div className='m-1 p-1'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <Message
            isOpen={showSuccessModal}
            message="Your account has been successfully Login."
            onClose={closeModal}
        />
        </div>
    );
};

export default Login;
