export default function Header() {
  return (
    <header id="site-header" class="fixed-top">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="index.html">
            Cooking<i class="as fa-bread-slice ms-1"></i>
          </a>
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon fa icon-expand fa-bars"></span>
            <span class="navbar-toggler-icon fa icon-close fa-times"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="index.html"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="classes.html">
                  Classes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
            </ul>
            <form
              action="#search"
              method="GET"
              class="d-flex search-header ms-lg-2"
            >
              <input
                class="form-control"
                type="search"
                placeholder="Enter Keyword..."
                aria-label="Search"
                required
              />
              <button class="btn btn-style" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
          <div class="cont-ser-position">
            <nav class="navigation">
              <div class="theme-switch-wrapper">
                <label class="theme-switch" for="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <div class="mode-container">
                    <i class="gg-sun"></i>
                    <i class="gg-moon"></i>
                  </div>
                </label>
              </div>
            </nav>
          </div>
        </nav>
      </div>
    </header>
  );
}
