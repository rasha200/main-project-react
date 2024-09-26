import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Card({ details }) {
  return (
    <OwlCarousel className="owl-carousel testimonial-carousel" loop margin={10} nav items={1} dots>
      {details.map((detail, index) => (
        <div className="bg-white p-5" key={index}>
          <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
          <p>{detail.comment}</p>
          <div className="d-flex flex-shrink-0 align-items-center mt-4">
            <img className="img-fluid mr-4" src={`img/testimonial-${index + 1}.jpg`} alt="" />
            <div>
              <h5>{detail.studentName}</h5>
              <span>{detail.courseName}</span>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}
