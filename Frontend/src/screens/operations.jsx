import React, { useState } from "react";
import { useFetchOperations } from "../api/hooks/useFetchOperations.js";
import OperationsTable from "../components/table/OperationsTable.jsx";
import {
  Backdrop,
  Chip,
  CircularProgress,
  Stack,
  Box,
  // InputBase,
  // Typography,
} from "@mui/material";
import {
  operationStatusValues,
  operationTypeValues,
} from "../utils/constants.js";
import MultipleSelectChip from "../components/Input/MultipleSelectChips.jsx";

const Operations = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [opTypes, setSelectedOpTypes] = useState([]);

  console.log(opTypes, "opTypes");

  const { operations, isLoading, isError, error } = useFetchOperations({
    type,
    opTypes,
  });

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(operations, "op data");

  return operations ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Fixed Section (Header with Chips and Search Bar) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: "10px",
          boxShadow: "0px 4px 2px -2px gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        {/* Left Side: Chips */}
        <Stack direction="row" spacing={2}>
          {operationStatusValues.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              onClick={() => setType(chip.value)}
              sx={{
                ...(chip.value === type && {
                  bgcolor: "#3f51b5",
                  ":hover": {
                    bgcolor: "#3f51b5",
                  },
                }),
              }}
            />
          ))}
        </Stack>
        {/* Operation Type Chip */}
        <MultipleSelectChip
          chipsData={operationTypeValues}
          selectedChips={opTypes}
          setSelectedChips={setSelectedOpTypes}
        />
        {/* Right Side: Search and Pulsing Dot */}
        {/* <Box display="flex" alignItems="center" gap={2}>
          <InputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0 10px",
              height: "35px",
              color: "white",
              width: "300px",
            }}
          />
        </Box> */}
      </Box>

      {/* Scrollable Table Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto", // Make the table content scrollable
          backgroundColor: "#1c1c1c",
        }}
      >
        <OperationsTable data={operations} /> {/* Pass real-time data */}
      </Box>
    </div>
  ) : (
    <div>No operations available.</div>
  );
};

export default Operations;
