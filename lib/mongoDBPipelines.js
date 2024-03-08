// MongoDB Atlas Search Pipline

// Pipline for fulltext serach after submit

export const createSearchPipline = (searchTerm) => {
  return [
    {
      $search: {
        index: "fullText",
        text: {
          query: searchTerm,
          path: {
            wildcard: "*",
          },
          fuzzy: { maxEdits: 2 },
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

// Pipline for autocomplete serach in "eventName" after input

export const createAutocompletePipeline = (searchTerm) => {
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
    { $project: { _id: 1, eventName: 1 } },
  ];
};
