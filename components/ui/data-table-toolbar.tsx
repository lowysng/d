"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "./button";
import {
    months,
    papers,
    subjects,
    variants,
    years,
} from "@/app/past-papers/table";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    function postAnalyticsResetFilterEvent() {
        fetch("/api/analytics", {
            method: "POST",
            body: JSON.stringify({
                event: "reset_filter",
            }),
        });
    }

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex flex-1 items-center flex-wrap">
                {/* <Input
                    disabled
                    placeholder="Filter tasks..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                /> */}
                {table.getColumn("subject") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("subject")}
                        title="Subject"
                        options={subjects}
                    />
                )}
                {table.getColumn("year") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("year")}
                        title="Year"
                        options={years}
                    />
                )}
                {table.getColumn("month") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("month")}
                        title="Month"
                        options={months}
                    />
                )}
                {table.getColumn("paperNumber") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("paperNumber")}
                        title="Paper #"
                        options={papers}
                    />
                )}
                {table.getColumn("variant") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("variant")}
                        title="Variant #"
                        options={variants}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            postAnalyticsResetFilterEvent();
                        }}
                        className="h-8 px-2 lg:px-3 hover:shadow-sm"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
