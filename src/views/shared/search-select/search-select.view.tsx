import { useEffect, useState } from "react";
import { Popover } from "@radix-ui/themes";
import Calendar from "react-calendar";
import dayjs from "dayjs";

import { useSearchSelectStyles } from "src/views/shared/search-select/search-select.styles";
import IconCaretDown from "src/assets/icon/caret-down.svg?react";
import IconCaretUp from "src/assets/icon/caret-up.svg?react";
import { Icon } from "src/views/shared/icon/icon.view";

import "./react-calendar-override.css";

interface ListDataItem {
  id: string;
  name: string;
  value: string;
  iconUrl: string;
}

interface SearchSelectProps<T> {
  label: string;
  type: "list" | "date";
  listData?: ListDataItem[];
  // value: string | [Date, Date];
  // setFormData: (formData: MessagesSearchFrom) => void;
  // formKey: string;
  formData: T;
  formKey: keyof T;
  getSelectValue?: (value: string) => void;
  getDateValue?: (value: DateValue) => void;
  setFormData: (formData: T) => void;
}

type DateValuePiece = Date | null;
export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

const shortcutsItems = [
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week").toDate(), prevWeek.endOf("week").toDate()];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth.toDate(), startOfNextMonth.endOf("month").toDate()];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

export const SearchSelect = <T,>({
  label,
  type,
  listData,
  formKey,
  formData,
  setFormData,
}: SearchSelectProps<T>) => {
  const classes = useSearchSelectStyles();

  const [selectValue, setSelectValue] = useState<ListDataItem>();
  const [showSelectPanel, setShowSelectPanel] = useState(false);
  const [dateValue, setDateValue] = useState<DateValue>([dayjs().toDate(), dayjs().toDate()]);

  const handleOpenChange = (isShowSelectPanel: boolean) => {
    setShowSelectPanel(isShowSelectPanel);
  };

  const handleListItemClick = (item: ListDataItem) => {
    setSelectValue(item);
    handleOpenChange(false);
  };

  const handleShortcutItemClick = (dateData: Date[] | null[]) => {
    setDateValue(dateData as [DateValuePiece, DateValuePiece]);
  };

  const getReadableDateString = (dateValue: DateValue) => {
    if (Array.isArray(dateValue)) {
      return `${dayjs(dateValue[0]).format("YYYY-MM-DD")} ${dayjs(dateValue[1]).format("YYYY-MM-DD")}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const newForm = formData;
    if (type === "list") {
      newForm[formKey] = selectValue as T[keyof T];
    } else {
      newForm[formKey] = dateValue as T[keyof T];
    }
    setFormData(newForm);
  }, [selectValue, dateValue, formData, formKey, type, setFormData]);

  return (
    <div className={classes.searchSelectWrap}>
      <Popover.Root open={showSelectPanel} onOpenChange={handleOpenChange}>
        <Popover.Trigger>
          <div className={classes.searchSelectButton}>
            <span className={classes.label}>{label}:&nbsp;</span>
            {type === "list" && selectValue && (
              <span className={classes.value}>{selectValue.name}</span>
            )}
            {type === "date" && dateValue && (
              <span className={classes.value}>{getReadableDateString(dateValue)}</span>
            )}
            {showSelectPanel ? <IconCaretUp /> : <IconCaretDown />}
          </div>
        </Popover.Trigger>
        <Popover.Content className={classes.radixPopover}>
          {type === "list" && (
            <div className={classes.listWrap}>
              <div className={classes.listContainer}>
                {listData?.map((item) => {
                  return (
                    <div
                      onClick={() => handleListItemClick(item)}
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
          {type === "date" && (
            <div className={classes.datePanelWrap}>
              <div className={classes.shortcutsWrap}>
                {shortcutsItems.map((item) => {
                  return (
                    <span
                      key={item.label}
                      onClick={() => handleShortcutItemClick(item.getValue())}
                      className={classes.shortcutItem}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
              <Calendar
                showDoubleView={true}
                selectRange={true}
                onChange={setDateValue}
                value={dateValue}
                showNavigation={true}
                showNeighboringMonth={false}
              />
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
