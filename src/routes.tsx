import { lazy } from "react";

export const challengesRoutes = [
  {
    path: 'counter',
    label: 'Counter',
    Component: lazy(() =>  import('./components').then((m) => ({ default: m.Counter })))
  },
  {
    path: 'accordions',
    label: 'Accordions',
    Component: lazy(() =>  import('./components').then((m) => ({ default: m.AccordionExample })))
  }
]
