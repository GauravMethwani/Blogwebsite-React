import { useState } from 'react';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../Firebaseconfig'; // Import the Firebase authentication instance
import { Link , useNavigate} from 'react-router-dom'; 
import Message from '../Components/Message';

const Signup = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }
        
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods && methods.length > 0) {
                setError('Email is already registered.');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                setEmail('')
                setPassword('')
                setShowSuccessModal(true);

            }
        } catch (error) {
            setError('Email is already registered');
        }
    };
    const closeModal = () => {
        setShowSuccessModal(false);
        navigate('/Login');
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
                    {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='m-1 p-1'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div className='m-1 p-1'>
                            <input
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Already signed up? Login
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            <Message
            isOpen={showSuccessModal}
            message="Your account has been successfully created."
            onClose={closeModal}
        />
        </div>
    );
};

export default Signup;
