import './accordion.css';

interface TAccordionItem {
  id: string;
  title: string;
  content: string;
}

interface TAccordion {
  items: TAccordionItem[]
}

const Accordion = ({ accordion }: { accordion: TAccordion }) => {
  return (
    <div className="accordions-container">
      {
        accordion.items.map((item) => (
          <details key={item.id} className="accordion">
            <summary className="accordion-summary">{item.title}</summary>
            <p className="accordion-content">{item.content}</p>
          </details>
        ))
      }
    </div>
  )
}

export { Accordion }
export type { TAccordion, TAccordionItem }
