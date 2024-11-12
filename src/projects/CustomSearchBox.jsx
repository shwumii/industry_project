import React, { useState } from "react";

const CustomSearchBox = ({ filterHandler }) => {
  return (
    <input
      type="text"
      onChange={(e) => filterHandler(e.target.value)}
      placeholder="Search Project Name"
      style={{ width: "200px", padding: "5px", fontSize: "14px" }}
    />
  );
};

export default CustomSearchBox;
