export default function Footer() {
    return (
        <footer class="w3l-footer-16">
        <div class="footer-top-16 py-5">
            <div class="container pt-lg-5 pt-md-4 pt-2 pb-lg-4 pb-2">
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <h3>About Us</h3>
                        <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nerihe re impedit quo
                            minus id qd maxime aceat facere.</p>
                        <div class="columns-2 mt-4">
                            <ul class="social">
                                <li><a href="#facebook"><i class="fab fa-facebook-f"></i></a>
                                </li>
                                <li><a href="#linkedin"><i class="fab fa-linkedin-in"></i></a>
                                </li>
                                <li><a href="#twitter"><i class="fab fa-twitter"></i></a>
                                </li>
                                <li><a href="#google"><i class="fab fa-google-plus-g"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-6 column ps-xl-5 mt-sm-0 mt-4">
                        <h3>Quick Link</h3>
                        <ul class="footer-gd-16">
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="classes.html">Classes</a></li>
                            <li><a href="#support">Support</a></li>
                            <li><a href="#blog">Blog Posts</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-6 column ps-xl-5 pe-lg-0 mt-lg-0 mt-4">
                        <h3>Contact Info</h3>
                        <ul class="footer-contact-list">
                            <li class=""><i class="fas fa-map-marker-alt"></i><span>10001, 5th Avenue,
                                    #32841 block, USA</span></li>
                            <li class="mt-2"><i class="fas fa-phone-alt"></i><span><a href="tel:+12 23456790">+1223
                                        456 790</a></span></li>
                        </ul>
                        <div class="footer-botm mt-3">
                            <h6>Open Hours:</h6>
                            <p class="mt-2"><span>Mon – Sat</span> : 9Am – 6Pm</p>
                            <p> <span>Sunday</span> : CLOSED</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 column mt-lg-0 mt-4 ps-xl-5">
                        <h3>Subscribe</h3>
                        <form action="#" class="subscribe d-flex" method="post">
                            <input type="email" name="email" placeholder="Email Address" required="" />
                            <button class="button-style"><span class="fa fa-paper-plane"
                                    aria-hidden="true"></span></button>
                        </form>
                        <p class="mt-4">Subscribe to our mailing list and get updates to your email inbox.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="copy-section text-center py-4">
            <p class="copy-text py-1">&copy; 2022 Cooking. All rights reserved. Design by <a
                    href="https://w3layouts.com/" target="_blank"> W3Layouts</a>
            </p>
        </div>
    </footer>
    )
}