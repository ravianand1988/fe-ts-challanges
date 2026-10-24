import { Accordion, type TAccordion } from "./Accordion";

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';
const LARGE_CONTENT = Array(50).fill(LOREM).join('');

const MOCK_ACCORDION_DATA: TAccordion = {
  items: [
    { id: '1', title: 'Section 1', content: LARGE_CONTENT },
    { id: '2', title: 'Section 2', content: LARGE_CONTENT },
    { id: '3', title: 'Section 3', content: LARGE_CONTENT },
    { id: '4', title: 'Section 4', content: LARGE_CONTENT },
    { id: '5', title: 'Section 5', content: LARGE_CONTENT },
  ]
}

export const AccordionExample = () => {
  return (
    <Accordion accordion={MOCK_ACCORDION_DATA} />
  )
}
