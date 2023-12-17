type QueryParams = {
  page: number;
  limit: number;
};

export const termKeys = {
  terms: {
    root: ["terms"],
    query: (query: QueryParams) => [...termKeys.terms.root, query],
    bySetId: (setId: string, query: QueryParams) => [
      ...termKeys.terms.root,
      setId,
      query,
    ],
  },
  term: {
    root: ["term"],
    id: (id: string) => [...termKeys.term.root, id],
  },
  mutations: {
    create: () => [...termKeys.term.root, "create"],
    update: () => [...termKeys.term.root, "update"],
    delete: () => [...termKeys.term.root, "delete"],
  },
};
