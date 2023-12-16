const Routing = {
  root: "/",
  folders: {
    index: "/folders",
    id: (id: string) => `/folders/${id}`,
  },
  sets: {
    index: "/sets",
    id: (id: string) => `/sets/${id}`,
    new: (folderId: string) => `/sets/new?folderId=${folderId}`,
    edit: (setId: string) => `/sets/${setId}/edit`,
  },
  about: "/about",
  contact: "/contact",
};

export default Routing;
