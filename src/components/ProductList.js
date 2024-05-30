
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds, IPX8",
    price: "ksh.9900.99",
    rating: 4.5,
    image:
      "https://i5.walmartimages.com/seo/Wireless-Earbuds-Bluetooth-5-0-Headphones-IPX8-Waterproof-Built-in-Mic-LED-Charging-Case-21-Hours-Playtime-Hight-Fidelity-Stereo-Sound-Quality-Ear-He_a7e7bef7-f039-4d00-bfe4-15676c26ad7c.24eca05c39f5baa6894dc7c693055b49.jpeg",
  },
  {
    id: 2,
    name: "AirPods Max",
    price: "ksh.55900.99",
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2s6jM9xfBedPYTm86XEZ6ZMZL7ViC_BxmA&s",
  },

];

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
