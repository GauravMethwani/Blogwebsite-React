import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { db, collection, addDoc } from '../Firebaseconfig'; // Adjust the path to Firebaseconfig.js as needed
import Modal from 'react-modal'; // Import React Modal

const BlogPost = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    // const [image, setImage] = useState(null); // State for image upload
    const [showModal, setShowModal] = useState(false); // State for modal visibility
   
  
      



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload image to Firebase Storage
            // Add blog post to Firestore
            await addBlogPost(title, subtitle, body);
            console.log('Blog post added successfully!');
            // Optionally, you can reset the form fields here
            setTitle('');
            setSubtitle('');
            setBody('');
            // Show modal after successful submission
            setShowModal(true);
        } catch (error) {
            console.error('Error adding blog post:', error);
        }
    };

    const addBlogPost = async (title, subtitle, body) => {
        const docRef = await addDoc(collection(db, 'blogs'), { title, subtitle, body });
        console.log('Blog post added with ID:', docRef.id);
    };

  

    return (
        <div className="max-w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg ">
            <h3 className="text-center text-lg font-semibold mb-4">
                Create a <span className="text-green-600">New</span> <span className="text-orange-500">Blog!</span>
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={subtitle}
                        required
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        required
                        // onChange={(e) => setImage(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4"
                    />
                </div>
                <div className="mb-16">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                    <div className="border border-gray-300 rounded-md max-h-screen">
                        <ReactQuill
                            theme="snow"
                            value={body}
                            onChange={(value) => setBody(value)}
                            className="h-40 sm:h-64" // Responsive height
                        />
                    </div>
                </div>
                <button type="submit" className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                    Submit
                </button>
            </form>
            {/* Modal */}
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal">
                <div className="modal-content">
                    <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
                    <p>Your blog post has been added.</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default BlogPost;
