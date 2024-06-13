import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Stack } from "@chakra-ui/react";
import { api } from "../utils/Main";

const Client = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      if (response.data.status === "success") {
        setUsers(response.data.users);
      } else {
        console.error("Error fetching users: Status not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <Stack spacing={4}>
        <h1>All Users</h1>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Contact</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    {user.first_name} {user.last_name}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.phone_number}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Stack>
    </div>
  );
};

export default Client;
