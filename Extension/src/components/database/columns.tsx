import { Checkbox } from "@/components/ui/checkbox"; // Ensure this import is correct
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  handleChangeState,
  handleDelete,
  handleMultipleChangeState,
  handleMultipleDelete,
} from "@/lib/controlerUtils";

const columns: ColumnDef<rule>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "url",
    accessorFn: (row) => row.url || row.domain,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ps-5 w-80">
        <p className="max-h-8 overflow-y-auto break-words">
          {row.original.url || row.original.domain}
        </p>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.url || rowA.original.domain || "";
      const b = rowB.original.url || rowB.original.domain || "";
      return a.localeCompare(b);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize ps-5">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ps-5">{row.original.url ? "Page" : "Domain"}</div>
    ),
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.url ? "a" : "b";
      const b = rowB.original.url ? "a" : "b";
      return b.localeCompare(a);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ table }) =>
      (table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                handleMultipleChangeState(
                  table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original) as rule[]
                )
              }
            >
              Change State
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500"
              onClick={() =>
                handleMultipleDelete(
                  table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original) as rule[]
                )
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    cell: ({ row }) => {
      const urlData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(
                  String(urlData.url || urlData.domain)
                )
              }
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                handleChangeState({
                  url: urlData.url,
                  domain: urlData.domain,
                })
              }
            >
              Change State
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500"
              onClick={() =>
                handleDelete({
                  url: urlData.url,
                  domain: urlData.domain,
                  status: urlData.status,
                })
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
