const Routing = {
  root: "/",
  folders: {
    index: "/folders",
    id: (id: string) => `/folders/${id}`,
  },
};

export default Routing;
