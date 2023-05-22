/* eslint-disable no-unused-vars */
import Person from '../../../assets/images/about_us/person.jpg';
import Parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 relative'>
                    <img src={Person} className="w-3/4 rounded-lg shadow-2xl" />
                    <img src={Parts} className="w-1/2 rounded-lg shadow-2xl absolute right-5 top-1/2 border-8  border-white " />
                </div>
                <div className='lg:w-1/2 space-y-5 p-4'>
                    <h3 className='text-rose-500 text-3xl font-bold'>About Us</h3>
                    <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
                    <p className="py-6 text-slate-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p className=' text-slate-400'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-error text-white">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;