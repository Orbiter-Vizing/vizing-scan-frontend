import { useEffect, useState, useRef } from "react";
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
    label: "Yesterday",
    getValue: () => {
      const today = dayjs();
      const yesterday = today.subtract(1, "day");
      return [yesterday.toDate(), yesterday.toDate()];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week").toDate(), prevWeek.endOf("week").toDate()];
    },
  },
  {
    label: "Last Month",
    getValue: () => {
      const today = dayjs();
      const startOfLastMonth = today.subtract(1, "month").startOf("month");
      const endOfLastMonth = today.subtract(1, "month").endOf("month");
      return [startOfLastMonth.toDate(), endOfLastMonth.toDate()];
    },
  },
  // {
  //   label: "Last Quater",
  //   getValue: () => {
  //     const today = dayjs();
  //     const startOfLastQuarter = dayjs().subtract(1, "quarter").startOf("quarter");
  //     const endOfLastQuarter = dayjs().subtract(1, "quarter").endOf("quarter");
  //     return [startOfLastQuarter.toDate(), endOfLastQuarter.toDate()];
  //   },
  // },
  {
    label: "Last Year",
    getValue: () => {
      const today = dayjs();
      const startOfLastYear = today.subtract(1, "year").startOf("year");
      const endOfLastYear = today.subtract(1, "year").endOf("year");
      return [startOfLastYear.toDate(), endOfLastYear.toDate()];
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
  const [dateValue, setDateValue] = useState<DateValue>(null);

  const anchorRef = useRef(null);

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
    if (Array.isArray(dateValue) && dateValue[0] && dateValue[1]) {
      return `${dayjs(dateValue[0]).format("YYYY-MM-DD")} ${dayjs(dateValue[1]).format("YYYY-MM-DD")}`;
    } else {
      return "All";
    }
  };

  useEffect(() => {
    const newForm = { ...formData };
    // const newForm = formData;
    if (type === "list") {
      newForm[formKey] = selectValue?.value as T[keyof T];
    } else {
      newForm[formKey] = dateValue as T[keyof T];
    }
    setFormData(newForm);
  }, [selectValue, dateValue, formKey, type, setFormData]); // add formData will cause re-render

  return (
    <div className={classes.searchSelectWrap}>
      <Popover.Root
        open={showSelectPanel}
        // className={classes.radixPopoverRoot}
        onOpenChange={handleOpenChange}
      >
        <Popover.Trigger ref={anchorRef}>
          <div className={classes.searchSelectButton}>
            <span className={classes.label}>{label}:&nbsp;</span>
            {type === "list" && (
              <span className={classes.value}>{selectValue ? selectValue.name : "All"}</span>
            )}
            {type === "date" && (
              <span className={classes.value}>
                {dateValue ? getReadableDateString(dateValue) : "All"}
              </span>
            )}
            {showSelectPanel ? <IconCaretUp /> : <IconCaretDown />}
          </div>
        </Popover.Trigger>
        {/* <Popover.Anchor ref={anchorRef} /> */}
        <Popover.Content
          className={classes.radixPopover}
          side="bottom"
          align="center"
          sideOffset={0}
        >
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
                      {item.iconUrl && <Icon isRounded size={16} url={item.iconUrl} />}
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
                locale="en-US"
              />
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
