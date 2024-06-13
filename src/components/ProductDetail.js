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
import "../styles/ProductDetail.css"; 

const ProductDetail = ({ products, onAddToCart, setProducts }) => {
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

  useEffect(() => {
    
    const foundProduct = products.find(
      (product) => product.id === parseInt(id, 10)
    );
    setProduct(foundProduct); // Set the product state
    setUpdatedProduct({
      description: foundProduct?.description || "",
      price: foundProduct?.price || 0,
      rating: foundProduct?.rating || 0,
      quantity: foundProduct?.quantity || 0,
      image_url: foundProduct?.image_url || "",
    });
  }, [id, products]);

  const isAdmin = () => {
    return user && user.role === "admin";
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
      navigate("/"); 

      setProduct(null); 
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error deleting product.",
        description:
          "There was an error deleting the product. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateModalOpen = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

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
        description: updatedProduct.description,
        price: updatedProduct.price,
        rating: updatedProduct.rating,
        quantity: updatedProduct.quantity,
        image_url: updatedProduct.image_url,
      });

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product.",
        description:
          "There was an error updating the product. Please try again.",
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

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="image-container">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="details-container">
        <h1>{product.product_name}</h1>
        <p>{product.description}</p>
        <p>{`Ksh: ${product.price}`}</p>
        <p>{`Rating: ${product.rating}`}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        {isAdmin() && (
          <>
            <button className="update-button" onClick={handleUpdateModalOpen}>
              Update Ad
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete Ad
            </button>
          </>
        )}
      </div>
      <Modal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                type="text" 
                value={updatedProduct.rating}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
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
  );
};

export default ProductDetail;
