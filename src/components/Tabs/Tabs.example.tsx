import { useState } from "react"
import { Tabs, type TTabItem } from "./Tabs"
import styles from './Tabs.module.css';

export const TabsExample = ()  => {
  const myTabs: TTabItem[] = [
    { name: 'React', active: false },
    { name: 'Angular', active: false },
    { name: 'Vue.js', active: false },
  ]

  const tabContent: Record<string, string> = {
    angular: 'Angular 22 is out in the market...',
    ['vue.js']: 'Vue 3 is out in the market...',
    react: 'React 19 and react complier is out in the market...',
  }

  const [selectedTab, setSelectedTab] = useState(myTabs[0].name);

  const handleTabChange = ($event: string) => {
    console.log('from parent: ', $event);
    setSelectedTab($event);
  }

  return (
    <>
      <Tabs tabs={myTabs} onSetTab={handleTabChange} />
      {
        myTabs.map((tab, index) => (
          <section
            className={[
              styles.tabContent,
              selectedTab === tab.name ? styles.tabVisible : styles.tabHidden
            ].join(' ')}
            key={index}
          >
            <h3>{`Tab: ${tab.name}`}</h3>
            <p>{tabContent[tab.name.toLowerCase()]}</p>
          </section>
        ))
      }
    </>
  )
}
