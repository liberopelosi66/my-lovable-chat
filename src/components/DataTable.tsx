import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: string[];
  rows: Record<string, unknown>[];
}

const DataTable = ({ columns, rows }: DataTableProps) => {
  if (rows.length === 0) {
    return (
      <div className="my-4 p-4 rounded-lg border border-border bg-muted/30 text-center text-muted-foreground">
        No results found
      </div>
    );
  }

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold text-foreground">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column} className="font-mono text-sm">
                    {String(row[column] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
        {rows.length} row{rows.length !== 1 ? "s" : ""} returned
      </div>
    </div>
  );
};

export default DataTable;
