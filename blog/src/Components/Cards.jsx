import { useState, useEffect } from 'react';
import { db } from '../Firebaseconfig'; // Adjust the path to Firebaseconfig.js as needed
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions directly
import myImage2 from '../assets/img/blog.jpg';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogs'));
                const blogsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [blogs]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {blogs.map((blog) => (
                <div key={blog.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={myImage2} alt="blog" className="w-full h-48 object-cover object-center" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p className="text-gray-600">{blog.subtitle}</p>
                    </div>
                    <div className="absolute bottom-2 right-2 z-10">
                    {/* Use Link from react-router-dom to navigate to the detail page */}
                    <Link to={`/BlogPage/${blog.id}`} className="text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
    Read More
</Link>
                </div>

                </div>
            ))}
        </div>
    );
};

export default BlogList;
