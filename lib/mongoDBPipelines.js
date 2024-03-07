// MongoDB Atlas Search pipline for search results

export const searchPipline = (searchTerm) => {
  return [
    {
      $search: {
        index: "fullText",
        text: {
          query: searchTerm,
          path: {
            wildcard: "*",
          },
          fuzzy: { maxEdits: 1 },
        },
      },
    },
    {
      $sort: {
        score: { $meta: "textScore" },
      },
    },
    {
      $addFields: {
        textScore: { $meta: "searchScore" },
      },
    },
  ];
};

// MongoDB Atlas Search pipline for autocomplete suggestions

export const autocompletePipeline = (searchTerm) => {
  return [
    {
      $search: {
        index: "autoComplete",
        autocomplete: {
          path: "eventName",
          query: searchTerm,
        },
      },
    },
    { $project: { _id: 0, eventName: 1 } },
  ];
};
