import React from "react";
import { Table } from "react-bootstrap";
import styles from "./ProjectsTable.module.css";

const ProjectsTable = () => {
  // Sample data
  const rows = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 4, name: "Eve", age: 28 },
    { id: 5, name: "Grace", age: 32 },
    { id: 6, name: "Michael", age: 40 },
    { id: 7, name: "Olivia", age: 22 },
    { id: 8, name: "Michael", age: 40 },
    { id: 9, name: "Olivia", age: 22 },
    { id: 10, name: "Michael", age: 40 },
    { id: 11, name: "Olivia", age: 22 },
  ];

  return (
    // Create a container div with a maximum
    // height and vertical scrollbar
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {/* Create a React Bootstrap Table with 
          striped, bordered, and hover styles */}
      <Table striped bordered hover>
        {/* Define the table header */}
        <thead style={{ position: "sticky", top: "0" }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        {/* Define the table body */}
        <tbody>
          {/* Map through the rows of data and  
              create a table row for each item */}
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
