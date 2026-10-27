import { useState } from "react";
import styles from './Tabs.module.css';

interface TTabItem {
  name: string;
  active: boolean;
}

interface TTabsProps {
  tabs: TTabItem[];
  defaultTab?: string;
  onSetTab: (tabName: string) => void;
}

const Tabs = ({ tabs, defaultTab, onSetTab }: TTabsProps ) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0].name);

  const handleTabClick = ({ target }: React.MouseEvent<HTMLDivElement>)  => {
    if (target instanceof HTMLButtonElement) {
      const tabName = target.dataset.tabName;
      console.log('active tab: ', tabName);
      if (tabName) {
        const findTab = tabs.find(t => t.name === tabName)!;
        findTab.active = true;
        setActiveTab(tabName);
        onSetTab(tabName);
      }
    }
  }

  return (
    <div className={styles.tabContainer} onClick={handleTabClick}>
      {
        tabs.map((tab, index) => {
          return (<button
            type="button"
            className={[
              activeTab === tab.name ? styles.tabActive : '',
              styles.tabItem,
            ].join(' ')}
            key={`${index}-${tab.name}`}
            data-tab-name={tab.name}
          >
            {tab.name}
          </button>
        )})
      }
    </div>
  )
}

export { Tabs };
export type {
  TTabItem
}
