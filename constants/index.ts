export const navItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    url: "/",
  },
  {
    name: "Documents",
    icon: "/assets/icons/documents.svg",
    url: "/documents",
  },
  {
    name: "Images",
    icon: "/assets/icons/images.svg",
    url: "/images",
  },
  {
    name: "Media",
    icon: "/assets/icons/video.svg",
    url: "/media",
  },
  {
    name: "Others",
    icon: "/assets/icons/others.svg",
    url: "/others",
  },
];

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://imgs.search.brave.com/abkapSUByvjrrYYoLh2trkZvVMg8i2h4UGc3kDhOfG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ5/NTA4ODA0My9mci92/ZWN0b3JpZWwvaWMl/QzMlQjRuZS1kZS1w/cm9maWwtdXRpbGlz/YXRldXItYXZhdGFy/LW91LWljJUMzJUI0/bmUtZGUtcGVyc29u/bmUtcGhvdG8tZGUt/cHJvZmlsLXN5bWJv/bGUtcG9ydHJhaXQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW1vTlJaall0VnBI/LUkwbUFlLVpmalZr/dXdnQ09xSC1CUlhG/TGhRa1pvUDg9";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
