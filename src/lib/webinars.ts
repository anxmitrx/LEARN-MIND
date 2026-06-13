export type Webinar = {
  id?: string;
  title: string;
  presenter: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
  link: string; // The Graphy Portal URL
};

export const webinars: Webinar[] = [
  {
    title: "Mastering React Server Components",
    presenter: "Alice Johnson",
    date: "2026-06-25",
    time: "10:00 AM PST",
    status: "upcoming",
    link: "https://your-graphy-link.com/webinar-1",
  },
  {
    title: "Advanced TailwindCSS Layouts",
    presenter: "Bob Smith",
    date: "2026-07-10",
    time: "2:00 PM EST",
    status: "upcoming",
    link: "https://your-graphy-link.com/webinar-2",
  },
  {
    title: "Figma to Code: Best Practices",
    presenter: "Charlie Davis",
    date: "2026-05-15",
    time: "1:00 PM PST",
    status: "past",
    link: "https://your-graphy-link.com/webinar-3",
  },
  {
    title: "Firebase Security Rules Deep Dive",
    presenter: "Diana Prince",
    date: "2026-04-20",
    time: "11:00 AM EST",
    status: "past",
    link: "https://your-graphy-link.com/webinar-4",
  },
];
