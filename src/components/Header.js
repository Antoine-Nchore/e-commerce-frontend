import "../styles/Header.css";
import myImage from "../Remove background project.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h2>
          Grab Upto 50% Off On <br /> Selected Product
        </h2>
        <button>Buy Now</button>
      </div>
      <img
        src={myImage} 
        alt="Headphones"
        className="header-image"
      />
    </header>
  );
};

export default Header;
