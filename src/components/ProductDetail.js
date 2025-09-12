import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/Main";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  ShoppingCart,
  Heart,
  Star,
  Facebook,
  Twitter,
  MessageCircle,
  CreditCard,
  Truck,
} from "lucide-react";
import ProductList from "../components/ProductList";
import "../styles/ProductDetail.css";

const ProductDetail = ({
  products,
  onAddToCart,
  setProducts,
  cartItems = [],
  onDecrementFromCart,
}) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    description: "",
    price: 0,
    rating: 0,
    quantity: 0,
    image_url: "",
  });
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ratingCount] = useState(() => Math.floor(Math.random() * 100) + 10);
 

  // Load product on mount
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id, 10));

    if (foundProduct) {
      setProduct(foundProduct);
      setUpdatedProduct({
        description: foundProduct.description,
        price: foundProduct.price,
        rating: foundProduct.rating,
        quantity: foundProduct.quantity,
        image_url: foundProduct.image_url,
      });

      // ✅ Save to recently viewed (keep latest 6)
      const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      const updated = [foundProduct, ...stored.filter((p) => p.id !== foundProduct.id)];
      localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 6)));
    }
  }, [id, products]);

  // Load recently viewed + wishlist
  useEffect(() => {
    const storedViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedViewed);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, [id]);

  const isAdmin = () => user && user.role === "admin";

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Helper: parse rating and truncate to one decimal (no rounding)
  const parseAndTruncate = (r) => {
    const num = Number(r) || 0;
    const truncated = Math.floor(num * 10) / 10; // truncate, not round
    return { num, truncated };
  };

  // ⭐ Render stars with half-star support
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="pd-star" fill="currentColor" />);
  }

  if (hasHalfStar) {
    stars.push(
      <span className="pd-star-half" key="half">
        <Star className="pd-star empty" />
        <span className="pd-half-fill">
          <Star className="pd-star" fill="currentColor" />
        </span>
      </span>
    );
  }

  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(<Star key={`empty-${i}`} className="pd-star empty" />);
  }

  return stars;
};


  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      toast({
        title: "Product deleted.",
        description: "The product has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      const updatedProducts = products.filter((p) => p.id !== parseInt(id, 10));
      setProducts(updatedProducts);

      navigate(`/collection/${product.category}`);
      setProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error deleting product.",
        description: "There was an error deleting the product. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateModalOpen = () => setIsUpdateModalOpen(true);
  const handleUpdateModalClose = () => setIsUpdateModalOpen(false);

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        ...updatedProduct,
        rating: parseFloat(updatedProduct.rating),
      };

      const response = await api.put(`/products/${id}`, updatedProductData);
      console.log(response.data);

      toast({
        title: "Product updated.",
        description: "The product has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setProduct({
        ...product,
        ...updatedProduct,
      });

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product.",
        description: "There was an error updating the product. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // ✅ Wishlist toggle
  const toggleWishlist = (prod) => {
    let updated;
    const exists = wishlist.find((p) => p.id === prod.id);

    if (exists) {
      updated = wishlist.filter((p) => p.id !== prod.id);
    } else {
      updated = [prod, ...wishlist];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (!product) {
    return <div className="product-loading">Product not found</div>;
  }

  const originalPrice = product.price * 1.4;
  const discount = calculateDiscount(originalPrice, product.price);
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  // Similar products filter
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // ✅ Check if product is in cart (safe guard)
  const cartItem = (cartItems || []).find((item) => item.id === product.id);

  // parse & truncated rating (for display)
  const { num: ratingNum, truncated: ratingTruncated } = parseAndTruncate(product.rating);

  return (
    <>
      <div className="product-detail">
        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          <Heart
            size={20}
            color={isWishlisted ? "orange" : "gray"}
            fill={isWishlisted ? "orange" : "none"}
          />
        </button>

        {/* Left Side */}
        <div className="product-detail-left">
          <div className="image-container">
            <img src={product.image_url} alt={product.product_name} />
          </div>

          <div className="share-section">
            <h3 className="share-title">Share This Product</h3>
            <div className="share-buttons">
              <button className="share-button facebook">
                <Facebook size={16} />
              </button>
              <button className="share-button twitter">
                <Twitter size={16} />
              </button>
              <button className="share-button whatsapp">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="product-detail-right">
          <div className="product-header">
            <h1 className="product-title">{product.product_name}</h1>
            <div className="product-brand">
              Brand:{" "}
              <a href="#" className="brand-link">
                {product.category || "Generic"}
              </a>{" "}
              |{" "}
              <a href="#" className="brand-link">
                Similar products from {product.category || "Generic"}
              </a>
            </div>
          </div>

          <div className="price-section">
            <span className="current-price">KSh {product.price}</span>
            <span className="original-price">KSh {originalPrice.toFixed(0)}</span>
            <span className="discount-badge">-{discount}%</span>
          </div>

          <div className="stock-info">
            {product.quantity > 0 ? "In stock" : "Out of stock"}
          </div>

<div className="rating-section">
  <div className="stars">{renderStars(product.rating)}</div>
  <span className="rating-value">{Number(product.rating).toFixed(1)}</span>
  <span className="rating-text"> ({ratingCount} verified ratings)</span>
</div>



<div className="add-to-cart-section">
  {!cartItem ? (
    <button
      className="add-to-cart-btn"
      onClick={() => onAddToCart(product)}
    >
      <ShoppingCart size={20} /> Add to Cart
    </button>
  ) : (
    <div className="quantity-controls">
      <button
        className="qty-btn"
        disabled={cartItem.quantity <= 1}
        onClick={() => onDecrementFromCart(product)}
      >
        –
      </button>
      <span className="qty">{cartItem.quantity}</span>
      <button
        className="qty-btn"
        disabled={cartItem.quantity >= product.quantity} // Disable + when reaching stock
        onClick={() => onAddToCart(product)}
      >
        +
      </button>
    </div>
  )}
</div>


          <div className="promotions-section">
            <h3 className="promotions-title">Promotions</h3>
            <div className="promotion-item">
              <CreditCard className="promotion-icon" size={20} />
              <span className="promotion-text">
                Easy and safer payments via the JumiaPay App.
              </span>
            </div>
            <div className="promotion-item">
              <Truck className="promotion-icon" size={20} />
              <span className="promotion-text">Fast nationwide delivery.</span>
            </div>
          </div>

          <div className="product-description">
            <h3 className="description-title">Product Description</h3>
            <p className="description-text">{product.description}</p>
          </div>

          {isAdmin() && (
            <div className="admin-controls">
              <button
                className="admin-btn update-button"
                onClick={handleUpdateModalOpen}
              >
                Update Product
              </button>
              <button className="admin-btn delete-button" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          )}
        </div>

        {/* Update Modal */}
        <Modal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Rating</FormLabel>
                <Input
                  name="rating"
                  type="text"
                  value={updatedProduct.rating}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  name="quantity"
                  type="number"
                  value={updatedProduct.quantity}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="image_url"
                  value={updatedProduct.image_url}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateModalClose}>
                Close
              </Button>
              <Button colorScheme="green" onClick={handleUpdateProduct}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

  <div  className="viewed-sect">
    {similarProducts.length > 0 ? (
      <ProductList
        products={similarProducts}
        title={`Similar products to ${product.product_name}`}
        seeAllRoute={`/collection/${product.category}`}
      />
    ) : (
      <p>No similar products available.</p>
    )}
  </div>



      {/* Recently Viewed Products */}

        <div  className="viewed-sect">
          {recentlyViewed.length > 0 ? (
            <ProductList  products={recentlyViewed}
    title="Recently Viewed"
    seeAllRoute="/recent" />
          ) : (
            <p>No recently viewed products yet.</p>
          )}
        </div>
     
    </>
  );
};

export default ProductDetail;
