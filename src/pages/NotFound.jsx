import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import "../styles/pages/NotFound.css";

export const NotFound = () => {
  return (
    <div className="notFound-container">
      <div className="notFound-hero">
        <div className="content-text">
          <h2>Oops... Page not found !</h2>
          <p>Sorry, the page you are looking for does not exist or has been moved.</p>
          <div className="w-full flex justify-center gap-6 mt-6">
            <Button color="primary" as={Link} href="/">Go back to Home</Button>
            <Button color="primary" variant="ghost" as={Link} href="/contact">Contact Us</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
