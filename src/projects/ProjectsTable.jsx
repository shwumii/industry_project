import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import CustomSearchBox from "./CustomSearchBox"; // Import the custom search box

// Test data
const initialProjects = [
  {
    name: "Marketing Revamp",
    type: "Marketing",
    clientName: "Client A",
    startDate: "2023-06-01",
    endDate: "2024-01-15",
  },
  {
    name: "New Product Launch",
    type: "Development",
    clientName: "Client B",
    startDate: "2024-01-01",
    endDate: "2024-08-15",
  },
  {
    name: "Customer Engagement Strategy",
    type: "Customer Success",
    clientName: "Client C",
    startDate: "2022-10-10",
    endDate: "2023-10-10",
  },
  {
    name: "Website Overhaul",
    type: "Design",
    clientName: "Client D",
    startDate: "2023-09-01",
    endDate: "2024-05-01",
  },
  // Additional test data...
];

const ProjectsTable = () => {
  const [projects, setProjects] = useState(initialProjects); // State for project data
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isEditing, setIsEditing] = useState(false); // Flag for enabling editing mode
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const getData = async () => {
    const response = await fetch("http://localhost:5000/projects");

    try {
      const data = await response.json();
      console.log(data);
      setProjects(data);
      return data;
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Define project types for the combo box
  const projectTypes = [
    "Induction Training",
    "Procedural Training",
    "Immersive Experience",
    "LMS Content",
  ];

  // Define columns for the table
  const columns = [
    {
      Header: "Project Name",
      accessor: "name",
    },
    {
      Header: "Project Type",
      accessor: "type",
    },
    {
      Header: "Client Name",
      accessor: "clientName",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
  ];

  // Handle row click for selecting a project
  const handleRowClick = (rowIndex) => {
    if (selectedRow !== rowIndex) {
      setSelectedRow(rowIndex);
      setIsEditing(true); // Automatically enable edit mode when selecting a row
    }
  };

  // Add a new empty project row and enter edit mode for that row
  const handleAddProject = () => {
    const newProject = {
      name: "",
      type: "Induction Training", // Default to "Induction Training"
      clientName: "",
      startDate: "",
      endDate: "",
    };
    setProjects([newProject, ...projects]); // Add the new row at the top
    setSelectedRow(0); // Select the new row
    setIsEditing(true); // Enter edit mode for the new project
  };

  // Handle cell change in the editable columns
  const handleCellChange = (columnId, rowIndex, value) => {
    const newProjects = [...projects];
    newProjects[rowIndex][columnId] = value; // Update the project data
    setProjects(newProjects); // Update the state
  };

  // Delete the selected project row
  const handleDeleteProject = () => {
    const newProjects = projects.filter((_, index) => index !== selectedRow);
    setProjects(newProjects); // Remove selected project from the state
    setSelectedRow(null); // Reset the selected row
  };

  // Enable or disable editing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Toggle the editing mode
  };

  // Search filter handler
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Filter projects based on the search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle clicks outside the table to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".table-container") && // If the click is outside the table
        isEditing // And if the user is in edit mode
      ) {
        setIsEditing(false); // Exit edit mode
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="table-container">
      <CustomSearchBox filterHandler={handleSearch} />
      <Button onClick={handleAddProject}>Add Project</Button>
      <Button
        onClick={toggleEditMode}
        variant="warning"
        disabled={selectedRow === null}
      >
        {isEditing ? "Stop Editing" : "Edit Project"}
      </Button>
      <Button
        onClick={handleDeleteProject}
        variant="danger"
        disabled={selectedRow === null}
      >
        Delete Selected
      </Button>

      <Table striped hover condensed>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.Header}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowClick(rowIndex)}
              style={{
                backgroundColor:
                  rowIndex === selectedRow ? "#1e52df" : "#f9f9f9", // Highlight selected row
                color: rowIndex === selectedRow ? "white" : "black", // Change text color of selected row
              }}
            >
              {columns.map((column) => {
                return (
                  <td
                    key={column.accessor}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      cursor:
                        isEditing && rowIndex === selectedRow
                          ? "pointer"
                          : "default",
                    }}
                  >
                    {column.accessor === "type" &&
                    isEditing &&
                    rowIndex === selectedRow ? (
                      // Display the combo box for the "type" column in edit mode
                      <select
                        value={project[column.accessor]}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent deselection of the row when changing value
                          handleCellChange(
                            column.accessor,
                            rowIndex,
                            e.target.value
                          );
                        }}
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    ) : isEditing && rowIndex === selectedRow ? (
                      // Display an input for editing text fields
                      <input
                        type="text"
                        value={project[column.accessor]}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent deselection of the row when changing value
                          handleCellChange(
                            column.accessor,
                            rowIndex,
                            e.target.value
                          );
                        }}
                        autoFocus
                      />
                    ) : (
                      project[column.accessor] // Display normal text if not editing
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
