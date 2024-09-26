import Card from "./Card";

export default function Testimonials() {
  const details = [
    { comment: "This website is amazing.", studentName: "Alex Ted", courseName: "History" },
    { comment: "Great web for tracking courses", studentName: "John Doe", courseName: "Physics" }
  ];

  return (
    <div className="container-fluid bg-image py-5" style={{ margin: '90px 0' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="section-title position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                Testimonial
              </h6>
              <h1 className="display-4">What Our Students Say</h1>
            </div>
            <p className="m-0">
              Dolor est dolores et nonumy sit labore dolores est sed rebum amet, justo duo ipsum
              sanctus dolore magna rebum sit et. Diam lorem ea sea at. Nonumy et at at sed justo est
              nonumy tempor. Vero sea ea eirmod, elitr ea amet diam ipsum at amet. Erat sed stet eos
              ipsum diam
            </p>
          </div>
          <div className="col-lg-7">
            <Card details={details} />
          </div>
        </div>
      </div>
    </div>
  );
}
