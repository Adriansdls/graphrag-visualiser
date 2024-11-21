import React, { useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface DataTableProps<T extends object> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
}

// Utility to handle circular references
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return typeof value === 'bigint' ? value.toString() : value;
  };
};

const DataTable = <T extends object>({
  data,
  columns,
}: DataTableProps<T>): React.ReactElement => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <Box sx={{ zIndex: 1500 }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setExpandedRow(expandedRow === row.index ? null : row.index),
          sx: { cursor: 'pointer' },
        })}
        renderDetailPanel={({ row }) => (
          <Collapse in={expandedRow === row.index} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2 }}>
              <pre>{JSON.stringify(row.original, getCircularReplacer(), 2)}</pre>
            </Box>
          </Collapse>
        )}
        renderRowActions={({ row }) => (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering row click
              setExpandedRow(expandedRow === row.index ? null : row.index);
            }}
          >
            {expandedRow === row.index ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      />
    </Box>
  );
};

export default DataTable;