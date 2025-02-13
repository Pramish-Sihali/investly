"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LucideGithub, LucideLinkedin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTitle, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from "@/components/ui/table";

const startups = [
  { name: "Eris Group", industry: "Luxury Real Estate", date: "11-02-2025", stage: "Idea", lookingFor: "€5,000,000", country: "🇮🇹" },
  { name: "Triggre Group B.V.", industry: "No-code", date: "11-02-2025", stage: "Scaling", lookingFor: "€500,000", country: "🇳🇱" },
  { name: "Yuma Health UG", industry: "Digital Health", date: "11-02-2025", stage: "MVP", lookingFor: "€350,000", country: "🇩🇪" },
  { name: "Upganic Ventures", industry: "Environment", date: "11-02-2025", stage: "MVP", lookingFor: "€3,000", country: "🇰🇪" },
  { name: "Hospitality Leaders", industry: "HR-Tech", date: "07-02-2025", stage: "MVP", lookingFor: "€100,000", country: "🇬🇧" },
];

export default function StartupTable() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const displayedStartups = startups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Looking For</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedStartups.map((startup, index) => (
            <TableRow key={index} onClick={() => setOpen(true)} className="cursor-pointer hover:bg-gray-100">
              <TableCell className="font-medium">{startup.name}</TableCell>
              <TableCell>{startup.industry}</TableCell>
              <TableCell>{startup.date}</TableCell>
              <TableCell>{startup.stage}</TableCell>
              <TableCell>{startup.lookingFor}</TableCell>
              <TableCell>{startup.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(startups.length / itemsPerPage)}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === Math.ceil(startups.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>

      {/* Registration Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Register to Invest</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="email">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google" className="flex items-center gap-2"><LucideLinkedin /> Google</TabsTrigger>
              <TabsTrigger value="github" className="flex items-center gap-2"><LucideGithub /> GitHub</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-4">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
            <Button className="w-full bg-[#F47B5D] text-white">Register</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
