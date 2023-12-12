const Routing = {
  root: "/",
  folders: {
    index: "/folders",
    id: (id: string) => `/folders/${id}`,
  },
  about: "/about",
  contact: "/contact",
};

export default Routing;
