import { Link } from "react-scroll";

export default function Navbar() {
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
        <Link
          to="hero"
          spy={true}
          smooth="easeInOutQuint" // Slow and smooth scroll behavior
          offset={-70}            // Adjust this based on your navbar height
          duration={1500}         // Duration in milliseconds (1500ms = 1.5 seconds)
          className="navbar-brand ml-lg-3"
        >
          <h1 className="m-0 text-uppercase text-primary">
            <i className="fa fa-book-reader mr-3"></i>Edukate
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between px-lg-3"
          id="navbarCollapse"
        >
          <div className="navbar-nav mx-auto py-0">
            <Link
              to="hero"
              spy={true}
              smooth="easeInOutQuint"
              offset={-70}
              duration={1500}
              className="nav-item nav-link"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth="easeInOutQuint"
              offset={-70}
              duration={1500}
              className="nav-item nav-link"
            >
              About
            </Link>
            <Link
              to="features"
              spy={true}
              smooth="easeInOutQuint"
              offset={-70}
              duration={1500}
              className="nav-item nav-link"
            >
              Features
            </Link>
            <Link
              to="courses"
              spy={true}
              smooth="easeInOutQuint"
              offset={-70}
              duration={1500}
              className="nav-item nav-link"
            >
              Courses
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth="easeInOutQuint"
              offset={-70}
              duration={1500}
              className="nav-item nav-link"
            >
              Contact
            </Link>
          </div>
          <a href="" className="btn btn-primary py-2 px-4 d-none d-lg-block">
            Join Us
          </a>
        </div>
      </nav>
    </div>
  );
}
