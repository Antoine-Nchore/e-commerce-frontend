import React, { useState } from "react";
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

const AddProduct = ({ isOpen, onClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    product_name: "",
    category: "",
    price: 0,
    image_url: "",
    description: "",
    rating: 0,
    quantity: 0,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    // Check if any field is empty
    for (const key in product) {
      if (product[key] === "" || product[key] === 0) {
        toast({
          title: "Missing Fields.",
          description: `Please fill out the ${key.replace("_", " ")} field.`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

 
    const productData = {
      ...product,
      price: Number(product.price),
      rating: Number(product.rating),
      quantity: Number(product.quantity),
    };

    try {
      const response = await api.post("products", productData);
      console.log(response.data);

     
      setProduct({
        product_name: "",
        category: "",
        price: 0,
        image_url: "",
        description: "",
        rating: 0,
        quantity: 0,
      });

      toast({
        title: "Product added.",
        description: "The product has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Call the callback to update products list in parent component
      if (typeof onProductAdded === "function") {
        onProductAdded(); // Call the callback passed from parent
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Error adding product.",
        description: "There was an error adding the product. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="image_url"
              value={product.image_url}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Input
              name="rating"
              type="number"
              value={product.rating}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Post Ad
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
