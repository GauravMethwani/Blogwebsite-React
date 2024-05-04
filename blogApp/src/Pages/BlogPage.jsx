import { useState, useEffect } from 'react';
import { db } from '../Firebaseconfig'; // Adjust the path to Firebaseconfig.js as needed
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions directly
import { useParams } from 'react-router-dom'; // Import useParams from React Router

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Extract id using useParams

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, 'blogs', id); // Use id directly
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        // Check if id is valid before fetching
        if (id) {
            fetchBlog();
        }

        // Clean up function to reset blog state on unmount or when id changes
        return () => setBlog(null);
    }, [id]); // Only run effect when id changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>No such document!</div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.subtitle}</p>
                <div className="prose" dangerouslySetInnerHTML={{ __html: blog.body }} />
            </div>
        </div>
    );
};

export default BlogPage;

