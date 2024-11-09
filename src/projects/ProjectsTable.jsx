import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import { Button } from "react-bootstrap";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Column definitions
  const columns = [
    { dataField: "id", text: "ID", sort: true },
    {
      dataField: "name",
      text: "Project Name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "status", text: "Status", editor: { type: "textarea" } },
    {
      dataField: "budget",
      text: "Budget",
      editor: { type: "number" },
      formatter: (cell) => `$${cell}`,
    },
    { dataField: "startDate", text: "Start Date", sort: true },
    { dataField: "endDate", text: "End Date", sort: true },
  ];

  // Handle row selection
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selectedRows,
    onSelect: (row, isSelect) => {
      if (isSelect) setSelectedRows([...selectedRows, row.id]);
      else setSelectedRows(selectedRows.filter((x) => x !== row.id));
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) setSelectedRows(rows.map((row) => row.id));
      else setSelectedRows([]);
    },
  };

  // Add new project
  const addProject = () => {
    const newProject = {
      name: "New Project",
      status: "Not Started",
      budget: "0",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    };
    axios
      .post("http://localhost:5000/api/projects", newProject)
      .then((response) => setProjects([...projects, response.data]))
      .catch((error) => console.error(error));
  };

  // Delete selected projects
  const deleteProjects = () => {
    selectedRows.forEach((id) => {
      axios
        .delete(`http://localhost:5000/api/projects/${id}`)
        .then(() =>
          setProjects(projects.filter((project) => project.id !== id))
        )
        .catch((error) => console.error(error));
    });
    setSelectedRows([]);
  };

  return (
    <div>
      <Button onClick={addProject}>Add Project</Button>
      <Button
        onClick={deleteProjects}
        variant="danger"
        disabled={!selectedRows.length}
      >
        Delete Selected
      </Button>
      <BootstrapTable
        keyField="id"
        data={projects}
        columns={columns}
        selectRow={selectRow}
        cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
        filter={filterFactory()}
        pagination={paginationFactory()}
        striped
        hover
        condensed
      />
    </div>
  );
};

export default ProjectsTable;
