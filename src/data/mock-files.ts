// Define the file item interface
export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  modified: string;
  parentId: string | null;
  mimeType?: string;
}

// Mock data for files and folders
export const mockFiles: FileItem[] = [
  {
    id: "root",
    name: "My Drive",
    type: "folder",
    modified: "2023-05-01",
    parentId: null,
  },
  {
    id: "folder1",
    name: "Documents",
    type: "folder",
    modified: "2023-05-10",
    parentId: "root",
  },
  {
    id: "folder2",
    name: "Images",
    type: "folder",
    modified: "2023-05-15",
    parentId: "root",
  },
  {
    id: "folder3",
    name: "Projects",
    type: "folder",
    modified: "2023-05-20",
    parentId: "root",
  },
  {
    id: "file1",
    name: "Resume.pdf",
    type: "file",
    size: "2.5 MB",
    modified: "2023-05-12",
    parentId: "folder1",
    mimeType: "application/pdf",
  },
  {
    id: "file2",
    name: "Cover Letter.docx",
    type: "file",
    size: "1.2 MB",
    modified: "2023-05-14",
    parentId: "folder1",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    id: "file3",
    name: "Profile.jpg",
    type: "file",
    size: "3.7 MB",
    modified: "2023-05-16",
    parentId: "folder2",
    mimeType: "image/jpeg",
  },
  {
    id: "file4",
    name: "Vacation.png",
    type: "file",
    size: "5.1 MB",
    modified: "2023-05-18",
    parentId: "folder2",
    mimeType: "image/png",
  },
  {
    id: "file5",
    name: "Project Plan.xlsx",
    type: "file",
    size: "1.8 MB",
    modified: "2023-05-22",
    parentId: "folder3",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    id: "folder4",
    name: "Personal",
    type: "folder",
    modified: "2023-05-25",
    parentId: "folder1",
  },
  {
    id: "file6",
    name: "Notes.txt",
    type: "file",
    size: "0.1 MB",
    modified: "2023-05-26",
    parentId: "folder4",
    mimeType: "text/plain",
  },
];
