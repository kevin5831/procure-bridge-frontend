import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CreateLocationDialog } from "./CreateLocationDialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mockLocations = Array(150).fill(null).map((_, index) => ({
  id: `${index + 1}`,
  name: `Location ${index + 1}`,
  code: `LOC-${(index + 1).toString().padStart(3, '0')}`,
  type: ["Head Office", "Branch", "Warehouse"][index % 3],
  country: ["US", "ET", "UK"][index % 3],
  city: ["New York", "Addis Ababa", "London"][index % 3],
  address: `${index + 1} Main Street`,
  status: "Active",
}));

const ITEMS_PER_PAGE = 10;

export function LocationsList() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = filterCountry === "all" || location.country === filterCountry;
    const matchesCity = filterCity === "all" || location.city === filterCity;

    return matchesSearch && matchesCountry && matchesCity;
  });

  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Locations</h2>
            <p className="text-sm text-muted-foreground">
              Manage your organization's locations and branches ({filteredLocations.length} total)
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          <Select 
            value={filterCountry} 
            onValueChange={(value) => {
              setFilterCountry(value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {Array.from(new Set(mockLocations.map(l => l.country))).map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={filterCity} 
            onValueChange={(value) => {
              setFilterCity(value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {Array.from(new Set(mockLocations.map(l => l.city))).map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[600px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLocations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No locations found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.code}</TableCell>
                    <TableCell>{location.type}</TableCell>
                    <TableCell>{location.country}</TableCell>
                    <TableCell>{location.city}</TableCell>
                    <TableCell>{location.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current
                  const isFirstPage = page === 1;
                  const isLastPage = page === totalPages;
                  const isCurrentPage = page === currentPage;
                  const isNearCurrent = Math.abs(page - currentPage) <= 1;
                  return isFirstPage || isLastPage || isCurrentPage || isNearCurrent;
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  if (index > 0 && page - array[index - 1] > 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <CreateLocationDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </CardContent>
    </Card>
  );
}
