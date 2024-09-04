import { FC, useState } from "react";
import { Button, Popover } from "@radix-ui/themes";

import { useSearchSelectStyles } from "src/views/shared/search-select/search-select.styles";
import IconCaretDown from "src/assets/icon/caret-down.svg?react";
import IconCaretUp from "src/assets/icon/caret-up.svg?react";
import { Icon } from "src/views/shared/icon/icon.view";

interface ListDataItem {
  id: string;
  name: string;
  value: string;
  iconUrl: string;
}

interface SearchSelectProps {
  label: string;
  type: "list" | "date";
  listData?: ListDataItem[];
}

export const SearchSelect: FC<SearchSelectProps> = ({ label, type, listData }) => {
  const classes = useSearchSelectStyles();

  const [selectValue, setSelectValue] = useState("All");
  const [showSelectPanel, setShowSelectPanel] = useState(false);

  const handleOpenChange = (isShowSelectPanel: boolean) => {
    setShowSelectPanel(isShowSelectPanel);
  };

  const handleListItemClick = (value: string) => {
    setSelectValue(value);
    handleOpenChange(false);
  };

  return (
    <div className={classes.searchSelectWrap}>
      <Popover.Root open={showSelectPanel} onOpenChange={handleOpenChange}>
        <Popover.Trigger>
          <div className={classes.searchSelectButton}>
            <span className={classes.label}>{label}:&nbsp;</span>
            <span className={classes.value}>{selectValue}</span>
            {showSelectPanel ? <IconCaretUp /> : <IconCaretDown />}
          </div>
        </Popover.Trigger>
        <Popover.Content className={classes.radixPopover} size="1" maxWidth="300px">
          {type === "list" && (
            <div className={classes.listWrap}>
              <div className={classes.listContainer}>
                {listData?.map((item) => {
                  return (
                    <div
                      onClick={() => handleListItemClick(item.value)}
                      key={item.id}
                      className={classes.selectItemWrap}
                    >
                      {item.iconUrl && <Icon isRounded size={32} url={item.iconUrl} />}
                      <span className={classes.selectItemName}>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {type === "date" && <div>date picker</div>}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
