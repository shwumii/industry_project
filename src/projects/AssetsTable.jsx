import React, { useEffect, useState } from "react";

const AssetsTable = () => {
  const [assets, setAssets] = useState([]);
  const [openSections, setOpenSections] = useState({
    "2D Animations": true,
    "3D Animations": false,
    "3D Models": true,
  });

  // Fetch asset list from API
  useEffect(() => {
    // fetch("/api/assets")
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  // Toggle asset's checked state and update the database
  const toggleChecked = async (assetId) => {
    // Find the asset by ID and toggle its checked status
    const updatedAssets = assets.map((asset) =>
      asset.id === assetId ? { ...asset, checked: !asset.checked } : asset
    );
    setAssets(updatedAssets);

    // Update the asset's checked status in the database
    const updatedAsset = updatedAssets.find((asset) => asset.id === assetId);
    try {
      await fetch(`/api/assets/${assetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: updatedAsset.checked }),
      });
    } catch (error) {
      console.error("Error updating asset status:", error);
    }
  };

  // Toggle open/close state of sections
  const toggleSection = (sectionName) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>ASSETS LIST</div>

      {/* Sections */}
      {["2D Animations", "3D Animations", "3D Models"].map((section) => (
        <div key={section} style={styles.section}>
          <div
            style={styles.sectionHeader}
            onClick={() => toggleSection(section)}
          >
            {openSections[section] ? "▼" : "►"} {section.toUpperCase()}
          </div>

          {openSections[section] && (
            <div style={styles.itemList}>
              {/* Filter assets by section */}
              {assets
                .filter((asset) => asset.type === section)
                .map((asset) => (
                  <div key={asset.id} style={styles.item}>
                    <input
                      type="checkbox"
                      checked={asset.checked}
                      onChange={() => toggleChecked(asset.id)}
                      style={styles.checkbox}
                    />
                    <span style={styles.fileName}>{asset.name}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    width: "250px",
    backgroundColor: "#1C4CA2",
    color: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
    padding: "10px",
    borderRadius: "5px",
  },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "10px",
  },
  sectionHeader: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },
  itemList: {
    paddingLeft: "20px",
    marginTop: "5px",
  },
  item: {
    fontSize: "14px",
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
  },
  fileName: {
    color: "#FFFFFF",
  },
};

export default AssetsTable;
