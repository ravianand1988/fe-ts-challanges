import { lazy } from "react";

export const challengesRoutes = [
  {
    path: "counter",
    label: "Counter",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.Counter })),
    ),
  },
  {
    path: "accordions",
    label: "Accordions",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.AccordionExample })),
    ),
  },
  {
    path: "star-rating",
    label: "Star Rating",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.StarRatingExample })),
    ),
  },
  {
    path: "tabs",
    label: "Tabs",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.TabsExample })),
    ),
  },
  {
    path: "dialog",
    label: "Dialog",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.DialogExample })),
    ),
  },
  {
    path: "data-table",
    label: "Data Table",
    Component: lazy(() =>
      import("./components").then((m) => ({ default: m.DataTableExample })),
    ),
  },
  {
    path: "data-table-master-dev",
    label: "Data Table Master.Dev",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.DataTableMasterExample,
      })),
    ),
  },
  {
    path: "gallery",
    label: "Gallery",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.GalleryExample,
      })),
    ),
  },
  {
    path: "reddit-thread",
    label: "Reddit Thread",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.RedditThreadExample,
      })),
    ),
  },
  {
    path: "toast",
    label: "Toast",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.ToastExample,
      })),
    ),
  },
  {
    path: "country-select",
    label: "Country Select",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.CountrySelectExample,
      })),
    ),
  },
  {
    path: "autocomplete",
    label: "Autocomplete",
    Component: lazy(() =>
      import("./components").then((m) => ({
        default: m.AutocompleteExample,
      })),
    ),
  },
];
