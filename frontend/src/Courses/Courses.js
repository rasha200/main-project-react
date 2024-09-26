import Owl from "./Owl";

export default function Courses() {
  const courses = [
    { courseName: "HTML & CSS", teacher: "Amro Shandaq", rate: 4.9 },
    { courseName: "JavaScript", teacher: "Moumen Shouha", rate: 4.8 },
    { courseName: "PHP & MySQL", teacher: "Moumen Shouha", rate: 4.9},
    { courseName: "Laravel", teacher: "Amro Shandaq", rate: 4.7}
  ];

  return (
    <div className="container-fluid px-0 py-5">
      <div className="row mx-0 justify-content-center pt-5">
        <div className="col-lg-6">
          <div className="section-title text-center position-relative mb-4">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Our Courses
            </h6>
            <h1 className="display-4">Checkout New Releases Of Our Courses</h1>
          </div>
        </div>
      </div>

      {/* Pass the array of courses as props to Owl */}
      <Owl courses={courses} />

      <div className="row justify-content-center bg-image mx-0 mb-5">
        <div className="col-lg-6 py-5">
          <div className="bg-white p-5 my-5">
            <h1 className="text-center mb-4">30% Off For New Students</h1>
            <form>
              <div className="form-row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Your Name"
                      style={{ padding: "30px 20px" }}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      placeholder="Your Email"
                      style={{ padding: "30px 20px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <select
                      className="custom-select bg-light border-0 px-3"
                      style={{ height: "60px" }}
                    >
                      <option selected>Select A course</option>
                      <option value="1">Course 1</option>
                      <option value="2">Course 2</option>
                      <option value="3">Course 3</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    style={{ height: "60px" }}
                  >
                    Sign Up Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
