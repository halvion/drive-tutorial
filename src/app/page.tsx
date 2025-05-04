"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  MoreVertical,
  Plus,
  Upload,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { mockFiles } from "~/data/mock-files";
import { ThemeToggle } from "~/components/theme-toggle";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([{ id: "root", name: "My Drive" }]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Get files and folders in the current directory
  const currentItems = mockFiles.filter(
    (item) => item.parentId === currentFolder,
  );

  // Handle folder navigation
  const navigateToFolder = (folderId: string, folderName: string) => {
    // Find the index of the folder in the current breadcrumbs
    const existingIndex = breadcrumbs.findIndex(
      (crumb) => crumb.id === folderId,
    );

    if (existingIndex >= 0) {
      // If we're navigating to a folder that's already in our breadcrumb trail,
      // trim the breadcrumbs to that point
      setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
    } else {
      // Otherwise add the new folder to our breadcrumbs
      setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    }

    setCurrentFolder(folderId);
  };

  // Get file icon based on mime type
  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return <FileText className="h-5 w-5" />;

    if (mimeType.startsWith("image/")) {
      return <File className="h-5 w-5 text-blue-400" />;
    } else if (mimeType.includes("spreadsheet")) {
      return <File className="h-5 w-5 text-green-400" />;
    } else if (mimeType.includes("document")) {
      return <File className="h-5 w-5 text-yellow-400" />;
    } else if (mimeType.includes("pdf")) {
      return <File className="h-5 w-5 text-red-400" />;
    }

    return <FileText className="h-5 w-5" />;
  };

  // Mock file upload handler
  const handleUpload = () => {
    setUploadDialogOpen(false);
    // In a real app, this would handle the file upload
    alert("File upload functionality would be implemented here");
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Google Drive Clone</h1>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Files</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-lg border-2 border-dashed p-8 text-center">
                    <Upload className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                    <p className="text-muted-foreground mb-2 text-sm">
                      Drag and drop files here or click to browse
                    </p>
                    <Input type="file" className="hidden" id="file-upload" />
                    <Button onClick={handleUpload}>Select Files</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => navigateToFolder(crumb.id, crumb.name)}
                    className="cursor-pointer"
                  >
                    {crumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* New Folder Button */}
        <div className="mb-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
        </div>

        {/* Files and Folders List */}
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 border-b p-3 font-medium">
              <div className="w-8"></div>
              <div>Name</div>
              <div className="text-right">Size</div>
              <div className="pr-2 text-right">Modified</div>
            </div>

            {currentItems.length === 0 ? (
              <div className="text-muted-foreground p-8 text-center">
                This folder is empty
              </div>
            ) : (
              <div>
                {/* Folders first */}
                {currentItems
                  .filter((item) => item.type === "folder")
                  .map((folder) => (
                    <div
                      key={folder.id}
                      className="hover:bg-muted/50 grid cursor-pointer grid-cols-[auto_1fr_auto_auto] gap-x-4 border-b p-3"
                      onClick={() => navigateToFolder(folder.id, folder.name)}
                    >
                      <div className="flex items-center justify-center">
                        <Folder className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex items-center">{folder.name}</div>
                      <div className="text-muted-foreground text-right">—</div>
                      <div className="text-muted-foreground pr-2 text-right">
                        {folder.modified}
                      </div>
                    </div>
                  ))}

                {/* Then files */}
                {currentItems
                  .filter((item) => item.type === "file")
                  .map((file) => (
                    <div
                      key={file.id}
                      className="hover:bg-muted/50 group grid grid-cols-[auto_1fr_auto_auto] gap-x-4 border-b p-3"
                    >
                      <div className="flex items-center justify-center">
                        {getFileIcon(file.mimeType)}
                      </div>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/files/${file.id}/${encodeURIComponent(file.name)}`}
                          className="hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            // Simulate opening the file
                            window.open(`#view-file-${file.id}`, "_blank");
                            // Alternative: Show a message
                            alert(`Opening file: ${file.name}`);
                          }}
                        >
                          {file.name}
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() =>
                                window.open(`#download-${file.id}`, "_blank")
                              }
                            >
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-muted-foreground text-right">
                        {file.size}
                      </div>
                      <div className="text-muted-foreground pr-2 text-right">
                        {file.modified}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
