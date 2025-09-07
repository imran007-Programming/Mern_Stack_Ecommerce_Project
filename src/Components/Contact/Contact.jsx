import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import "./Contact.scss";
const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            We'd love to hear from you! Please reach out with any questions or
            feedback.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <PhoneIcon className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600 mt-1">+880 1647 153126</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <EnvelopeIcon className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600 mt-1">support@onlinenest.com</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <MapPinIcon className="h-8 w-8 text-red-500 mb-2" />
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600 mt-1">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="relative px-5 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>

              {/* Glossy streak */}
              <span
                className="absolute top-0 left-0 h-full w-[120px] 
      bg-gradient-to-r from-transparent via-white/40 to-transparent
      -translate-x-full rotate-25 group-hover:animate-shine"
              ></span>
            </button>
          </form>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.90215388386!2d90.39165431498123!3d23.7508675845896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b4f4088a03%3A0x6c60f2e8f3b1a0f3!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1634033498371!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="w-full h-80"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
