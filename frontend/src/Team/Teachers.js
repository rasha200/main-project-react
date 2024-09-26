import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Teachers({ teachers }) {
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      nav
      items={3}
      style={{ padding: "0 30px" }}
    >
      {teachers.map((teacher, index) => (
        <div className="team-item" key={index}>
          <img className="img-fluid w-100" src={`img/team-${index + 1}.jpg`} alt="" />
          <div className="bg-light text-center p-4">
            <h5 className="mb-3">{teacher.teacherName}</h5>
            <p className="mb-2">{teacher.courseName}</p>
            <div className="d-flex justify-content-center">
              <a className="mx-1 p-1" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="mx-1 p-1" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="mx-1 p-1" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="mx-1 p-1" href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="mx-1 p-1" href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}

  