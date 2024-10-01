import { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([
  ]);

  // Fetch testimonials data from API
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/testimonials");
      
      // Log the full response and data for debugging
      console.log("API Response:", response.data);
  
      if (response.data && Array.isArray(response.data)) {
        setTestimonials(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials(); // Fetch testimonials when the component mounts
  }, []);

  return (
    <div className="testimonials-section">
      <h2 className="section-title">What Our Customers Say</h2>

      <div className="testimonials-container">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div className="testimonial" key={testimonial.id}>
              <p className="testimonial-message">{testimonial.message}</p>
              <h3 className="customer-name">
                - {testimonial.user.Fname} {testimonial.user.Lname}
              </h3>
            </div>
          ))
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>
    </div>
  );
}
