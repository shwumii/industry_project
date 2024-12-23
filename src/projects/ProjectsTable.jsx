import React, { useState, useEffect, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import CustomSearchBox from "./CustomSearchBox"; // Import the custom search box

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]); // State for project data
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isEditing, setIsEditing] = useState(false); // Flag for enabling editing mode
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    client: "",
    date_start: "",
    date_end: "",
  });

  //---------------------
  // const getProject = async () => {
  //   const response = await fetch("http://localhost:5000/projects");

  //   try {
  //     const getProject = await response.json();
  //     console.log(getProject);
  //     setProjects(getProject);
  //     return getProject;
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };
  //---------------------
  
    const getProject = async () => {
        const session = localStorage.getItem("session");
    // Define any custom headers you need to include in your request
    const headers = {
      "Content-Type": "application/json", // Set content type if needed
      "session": session, // Example header for authorization
    };

    try {
      // Make the fetch request with custom headers
      const response = await fetch("http://localhost:5000/projects", {
        method: "GET", // Use GET method for retrieving data
        headers: headers, // Add the headers object to the request
      });

      // Check for a successful response
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the fetched data
        setProjects(data); // Update state with the fetched projects
        return data;
      } else {
        console.error(
          "Error fetching projects:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const addProject = async (newProject) => {
  //   const response = await fetch("http://localhost:5000/projects", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newProject), // Sends the full newProject object
  //   });

  //   if (response.ok) {
  //     const addedProject = await response.json();
  //     console.log("Project added:", addedProject);
  //     // Optionally refresh the project list after adding
  //     getProject();
  //   } else {
  //     console.error("Error adding project");
  //   }
  // };

  const addProject = async (newProjectArray) => {
      const [name, type, client, date_start, date_end] = newProjectArray;
      const newProjectObject = { name, type, client, date_start, date_end };
      const session = localStorage.getItem("session");

    console.log("Sending project to API:", newProjectObject); // Log the data to check

    try {
      const response = await fetch("http://localhost:5000/project", {
        method: "POST",
          headers: { "Content-Type": "application/json", "session": session,},
        body: JSON.stringify(newProjectObject),
      });

      if (response.ok) {
        console.log("Project added successfully:", await response.json()); // Log API response
        await getProject(); // Refresh projects list
      } else {
        console.error(
          "Error adding project:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //STILL Work on this
  const updateProject = async (newProjectArray) => {
    const [name, type, client, date_start, date_end] = newProjectArray;
    const newProjectObject = { name, type, client, date_start, date_end };
    const session = localStorage.getItem("session");
    console.log("Sending project to API:", newProjectObject); // Log the data to check

    try {
      const response = await fetch("http://localhost:5000/project", {
        method: "POST",
          headers: { "Content-Type": "application/json", "session": session },
        body: JSON.stringify(newProjectObject),
      });

      if (response.ok) {
        console.log("Project added successfully:", await response.json()); // Log API response
        await getProject(); // Refresh projects list
      } else {
        console.error(
          "Error adding project:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

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
      accessor: "client",
    },
    {
      Header: "Start Date",
      accessor: "date_start",
    },
    {
      Header: "End Date",
      accessor: "date_end",
    },
  ];

  // Handle row click for selecting a project
  const handleRowClick = (rowIndex) => {
    if (selectedRow !== rowIndex) {
      setSelectedRow(rowIndex); // Select the row only
    }
  };

  // Add a new empty project row and enter edit mode for that row
  const handleAddProject = () => {
    const newProject = {
      name: "",
      type: "", // Default to "Induction Training"
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
    if (selectedRow !== null) {
      setIsEditing(!isEditing); // Toggle editing mode if a row is selected
    }
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

  const handleNameChange = (e) => {
    setForm({
      ...form,
      name: e.target.value,
    });
  };
  const handleTypeChange = (e) => {
    setForm({
      ...form,
      type: e.target.value,
    });
  };
  const handleClientChange = (e) => {
    setForm({
      ...form,
      client: e.target.value,
    });
  };
  const handleDateStartChange = (e) => {
    setForm({
      ...form,
      date_start: e.target.value,
    });
  };
  const handleDateEndChange = (e) => {
    setForm({
      ...form,
      date_end: e.target.value,
    });
  };

  // const submitForm = () => {
  // validation
  // const isValid = true;

  // if (isValid) {
  //addProject();
  // console.log("It Works!");
  // }
  // };

  const submitForm = () => {
    // Validation
    const isValid =
      form.name && form.type && form.client && form.date_start && form.date_end;

    if (isValid) {
      // Build the new project array from form data
      const newProject = [
        form.name,
        form.type,
        form.client,
        form.date_start,
        form.date_end,
      ];

      // Call addProject with the newProject array to add it to the database
      addProject(newProject);

      // Optionally reset the form after submission
      setForm({
        name: "",
        type: "",
        client: "",
        date_start: "",
        date_end: "",
      });

      // Hide the add form row
      setAddFormVisible(false);
    } else {
      console.log("Please fill in all required fields");
    }
  };

  const addFormRowRef = useRef(null);
  const handleBlur = (e) => {
    if (!addFormRowRef.current.matches(":focus-within")) {
      submitForm();
      console.log("Edit ROW Ref is working!");
    }
  };

  return (
    <div className="table-container">
      <CustomSearchBox filterHandler={handleSearch} />
      <Button type="button" onClick={() => setAddFormVisible(!addFormVisible)}>
        Add Project
      </Button>
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
              <th
                key={column.Header}
                style={{
                  borderBottom: "4px solid #2d1f70", // Thicker border for header
                  color: "black",
                  padding: "8px",
                }}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {addFormVisible && (
            <tr ref={addFormRowRef}>
              <td>
                <input
                  name="name"
                  value={form.name}
                  onBlur={handleBlur}
                  onChange={handleNameChange}
                  type="text"
                  autoFocus
                />
              </td>
              <td>
                <input
                  name="type"
                  value={form.type}
                  onBlur={handleBlur}
                  onChange={handleTypeChange}
                  type="text"
                />
              </td>
              <td>
                <input
                  name="client"
                  value={form.client}
                  onBlur={handleBlur}
                  onChange={handleClientChange}
                  type="text"
                />
              </td>
              <td>
                <input
                  name="date_start"
                  value={form.date_start}
                  onChange={handleDateStartChange}
                  type="text"
                />
              </td>
              <td>
                <input
                  name="date_end"
                  value={form.date_end}
                  onBlur={handleBlur}
                  onChange={handleDateEndChange}
                  type="text"
                />
              </td>
            </tr>
          )}

          {filteredProjects.map((project, rowIndex) => (
            <tr
              key={rowIndex}
              // Conditionally attach the ref only to the selected (editable) row
              ref={rowIndex === selectedRow ? addFormRowRef : null}
              onClick={() => handleRowClick(rowIndex)}
              style={{
                backgroundColor:
                  rowIndex === selectedRow ? "#1e52df" : "#f9f9f9",
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  style={{
                    border: "2px solid #2d1f70", // Thicker border for cells
                    padding: "8px",
                    backgroundColor:
                      rowIndex === selectedRow ? "#1e52df" : "#f9f9f9",
                    color: rowIndex === selectedRow ? "white" : "black",
                    cursor:
                      isEditing && rowIndex === selectedRow
                        ? "pointer"
                        : "default",
                  }}
                >
                  {column.accessor === "name" &&
                  isEditing &&
                  rowIndex === selectedRow ? (
                    <input
                      type="text"
                      value={project[column.accessor]}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCellChange(
                          column.accessor,
                          rowIndex,
                          e.target.value
                        );
                      }}
                      autoFocus
                    />
                  ) : isEditing && rowIndex === selectedRow ? (
                    <input
                      type="text"
                      value={project[column.accessor]}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCellChange(
                          column.accessor,
                          rowIndex,
                          e.target.value
                        );
                      }}
                    />
                  ) : (
                    project[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
