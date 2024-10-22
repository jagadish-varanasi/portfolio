export const defaultNote = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 4,
      },
      content: [
        {
          type: "text",
          text: "Plan your tasks!",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Task one",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://vercel.com/templates/next.js/novel",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        class:
                          "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                      },
                    },
                  ],
                  text: "Task two",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Task three",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
            },
          ],
        },
      ],
    },
  ],
};
