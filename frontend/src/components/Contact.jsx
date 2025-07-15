import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import usePopBounceAnimation from '../hooks/usePopBounceAnimation';

const Contact = () => {
  usePopBounceAnimation();
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_u6zoypf',
      'template_u8j2auc',
      form.current,
      'ViG56TIHpBL3V3IGB'
    ).then(
      () => {
        setSubmitted(true);
        form.current.reset();
      },
      (error) => {
        console.error('EmailJS Error:', error.text);
        alert('Failed to send message.');
      }
    );
  };

  return (
    <section id='contact' className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-10 pop-bounce">
          📞 Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6 text-gray-700 pop-bounce">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-orange-500 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p>+91 98765 43XXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-orange-500 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p>support@naturegrocery.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-orange-500 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Address</h4>
                <p>NatureGrocery HQ, Ameerpet, Hyderabad, Telangana, India - 500016</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md pop-bounce">
            {submitted ? (
              <div className="text-green-600 font-semibold text-center text-lg">
                ✅ Thank you for reaching out! We’ll get back to you soon.
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Message Subject"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pop-bounce">
          <h3 className="text-xl font-semibold mb-4 text-green-700">Our Location</h3>
          <iframe
            title="NatureGrocery Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.077230370288!2d78.48667861487694!3d17.38504468806708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977dd430c79d%3A0x7d74ae8f71aa226a!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1622621234567!5m2!1sen!2sin"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded border"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
