// assets/js/footer.js

// Load Footer Content
function loadFooter() {
    document.getElementById("footer").innerHTML = `
        <footer class="footer">
            <!-- Footer Top with CodeSync and Footer Bottom with Back to Top -->
<div class="footer-top">
    <h1 class="code-sync-text">CodeSync</h1>
</div>


            <div class="footer-container">
                <!-- Quick Links -->
                <div class="footer-section quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./index" aria-label="Home">Home</a></li>
                        <li><a href="./aboutus" aria-label="About Us">About Us</a></li>
                        <li><a href="./login" aria-label="Contact">Login</a></li>
                     
                    </ul>
                </div>

               

                <!-- Newsletter Subscription -->
                <div class="footer-section newsletter">
                    <h4>Subscribe to our Newsletter</h4>
                    <form action="/subscribe" method="POST" id="newsletterForm" aria-label="Newsletter Subscription">
                        <input
                            type="email"
                            id="newsletter-email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            aria-label="Email Address"
                        />
                        <button type="submit" aria-label="Subscribe to Newsletter">Subscribe</button>
                    </form>
                </div>

                <!-- Social Media Icons -->
                <div class="footer-section social-icons">
  <h4>Follow Us</h4>
  <a href="https://facebook.com/codesync" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
    <img src="https://static.vecteezy.com/system/resources/previews/018/930/476/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="Facebook Icon" width="32" height="32">
  </a>
  <a href="https://twitter.com/codesync" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
    <img src="https://clipartcraft.com/images/twitter-transparent-logo-social-media.png" alt="Twitter Icon" width="32" height="32">
  </a>
  <a href="https://instagram.com/codesync" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Icon" width="32" height="32">
  </a>
  <a href="https://linkedin.com/company/codesync" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
    <img src="https://th.bing.com/th/id/OIP.w_zDkEJ9aLiWR-g0rff8hwHaHa?rs=1&pid=ImgDetMain" alt="LinkedIn Icon" width="32" height="32">
  </a>
</div>

            </div>

            <!-- Footer Bottom and Back to Top -->
            <div class="footer-bottom">
                <p>&copy; 2024 Code Sync. All Rights Reserved.</p>
                <a href="#header" class="back-to-top" aria-label="Back to Top">
                    <i class="fas fa-arrow-up"></i> Back to Top
                </a>
            </div>
        </footer>
    `;
}

// Handle newsletter form submission
function addNewsletterFormListener() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();
            if (validateEmail(email)) {
                // In a real application, you would send this data to the server
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Basic email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Get the button
const backToTopButton = document.getElementById("backToTop");

// Show the button when the user scrolls down 100px
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

