import { Highlight } from "./higlight";

export const CARDS = [
  {
    id: 0,
    key: "requirements",
    name: "Requirement",
    designation: <Highlight>Requirement is to analyze</Highlight>,
    content: (data: string) => <p>{data}</p>,
  },
  {
    id: 1,
    key: "epics",
    name: "Epic",
    designation: <Highlight>Epic is bigger chunk of requirement.</Highlight>,
    content: (data: string) => (
      <p>
        {data}I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    key: "releases",
    name: "Release",
    designation: (
      <Highlight>Release contains info about major solutions.</Highlight>
    ),
    content: (data: string) => (
      <p>
        {data}
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
  {
    id: 3,
    key: "sprints",
    name: "Sprint",
    designation: (
      <Highlight>Sprint contains info about major solutions.</Highlight>
    ),
    content: (data: string) => (
      <p>
        {data}
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
