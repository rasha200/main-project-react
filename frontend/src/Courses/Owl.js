import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Owl({ courses }) {
  return (
    <OwlCarousel className="owl-theme" loop margin={10} nav items={4}>
      {courses.map((course, index) => (
        <div className="courses-item position-relative" key={index}>
          <img className="img-fluid" src={`img/courses-${index + 1}.jpg`} alt="" />
          <div className="courses-text">
            <h4 className="text-center text-white px-3">{course.courseName}</h4>
            <div className="border-top w-100 mt-3">
              <div className="d-flex justify-content-between p-4">
                <span className="text-white">
                  <i className="fa fa-user mr-2"></i>{course.teacher}
                </span>
                <span className="text-white">
                  <i className="fa fa-star mr-2"></i>{course.rate}<small>(250)</small>
                </span>
              </div>
            </div>
            <div className="w-100 bg-white text-center p-4">
              <a className="btn btn-primary" href="detail.html">Course Detail</a>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}
