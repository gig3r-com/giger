"use client"

import * as React from "react"
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from "@mui/material"

export interface Column<T> { key: keyof T; label: string; width?: number | string; align?: "left" | "right" | "center" }

export default function BasicTable<T extends Record<string, any>>({
  columns,
  rows,
}: {
    columns: Column<T>[]
    rows: T[]
}) {
  const safeCols = columns ?? ([] as Column<T>[])
  const safeRows = rows ?? ([] as T[])

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: "70vh" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {safeCols.map((c) => (
              <TableCell key={String(c.key)} align={c.align ?? "left"}>
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeRows.map((r, i) => (
            <TableRow key={i} hover>
              {safeCols.map((c) => (
                <TableCell key={String(c.key)} align={c.align ?? "left"}>
                  {String(r[c.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
