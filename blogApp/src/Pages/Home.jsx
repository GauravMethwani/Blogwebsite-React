
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import myImage1 from '../assets/img/blog.jpg';
import myImage2 from '../assets/img/blog1.jpg';
import Cards from '../Components/Cards';


const Home = () => {
    return (
        <div>
        <div className="max-w-full mx-auto mt-6 p-5 rounded-lg overflow-hidden -z-10">
            <Carousel
                autoPlay
                interval={3000} // Change interval as needed
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                transitionTime={500}
            >
                <div>
                    <img
                        src={myImage2}
                        alt="Blog Image 1"
                        className="w-full h-96 object-cover object-center rounded-md"
                    />
                </div>
                <div>
                    <img
                        src={myImage2}
                        alt="Blog Image 2"
                        className="w-full h-96 object-cover object-center rounded-md"
                    />
                </div>
                <div>
                    <img
                        src={myImage2}
                        alt="Blog Image 3"
                        className="w-full h-96 object-cover object-center rounded-md"
                    />
                </div>
            </Carousel>
        </div>
        <Cards/>
        </div>
    );
};

export default Home;
