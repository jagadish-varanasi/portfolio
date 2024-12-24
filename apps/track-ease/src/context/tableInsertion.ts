export function addTable(data: {
  title: string;
  description: string;
  hlMap: Array<{ id: string; requirement: string }>;
}) {
  const { title, description, hlMap } = data;
  return [
    {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [227],
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "High Level Requirements",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [505],
              },
              content: [
                {
                  type: "orderedList",
                  attrs: {
                    start: 1,
                  },
                  content: Object.values(hlMap || []).map((req: any) => ({
                    type: "listItem",
                    content: [
                      {
                        type: "paragraph",
                        attrs: {
                          textAlign: "left",
                        },
                        content: [
                          {
                            type: "text",
                            text: req.requirement,
                          },
                        ],
                      },
                    ],
                  })),
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [227],
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "Title",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [505],
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: title || "",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [227],
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "Description",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [505],
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: description || "",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: " ",
        },
      ],
    },
  ];
}
