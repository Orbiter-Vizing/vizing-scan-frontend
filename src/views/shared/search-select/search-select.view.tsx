import { useEffect, useState, useRef } from "react";
import { Popover } from "@radix-ui/themes";
import Calendar from "react-calendar";
import dayjs from "dayjs";
// to fix typescript error
// Argument of type '"quarter"' is not assignable to parameter of type 'ManipulateType | undefined'.
import quarterOfYear from "dayjs/plugin/quarterOfYear";

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

interface SearchSelectProps<T, P> {
  label: string;
  type: "list" | "date";
  direction?: "row" | "column";
  listData?: ListDataItem[];
  // binding form
  formData?: T;
  formKey?: keyof T;
  setFormData?: (formData: T) => void;
  // binding value
  value?: P;
  setValue?: (value: P) => void;
  getSelectValue?: (value: string) => void;
  getDateValue?: (value: DateValue) => void;
}

type DateValuePiece = Date | null;
export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

const shortcutsItems = [
  {
    label: "Yesterday",
    getValue: (): DateValue => {
      const today = dayjs();
      const yesterday = today.subtract(1, "day");
      return [yesterday.toDate(), yesterday.toDate()];
    },
  },
  {
    label: "Last Week",
    getValue: (): DateValue => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week").toDate(), prevWeek.endOf("week").toDate()];
    },
  },
  {
    label: "Last Month",
    getValue: (): DateValue => {
      const today = dayjs();
      const startOfLastMonth = today.subtract(1, "month").startOf("month");
      const endOfLastMonth = today.subtract(1, "month").endOf("month");
      return [startOfLastMonth.toDate(), endOfLastMonth.toDate()];
    },
  },
  {
    label: "Last Quater",
    getValue: (): DateValue => {
      const today = dayjs();
      const threeMonthsAgo = today.subtract(3, "month");
      return [threeMonthsAgo.toDate(), today.toDate()];
    },
  },
  {
    label: "Last Year",
    getValue: (): DateValue => {
      const today = dayjs();
      const startOfLastYear = today.subtract(1, "year").startOf("year");
      const endOfLastYear = today.subtract(1, "year").endOf("year");
      return [startOfLastYear.toDate(), endOfLastYear.toDate()];
    },
  },
  {
    label: "Custom",
    getValue: (): DateValue => {
      return [null, null];
    },
  },
  // { label: "Reset", getValue: () => [null, null] },
];

export const SearchSelect = <T, P>({
  label,
  type,
  direction,
  listData,
  formKey,
  formData,
  setFormData,
  value,
  setValue,
}: SearchSelectProps<T, P>) => {
  const classes = useSearchSelectStyles();

  const [selectValue, setSelectValue] = useState<ListDataItem>();
  const [showSelectPanel, setShowSelectPanel] = useState(false);
  const [dateValue, setDateValue] = useState<DateValue>(null);
  const [currentShortcutItem, setCurrentShortcutItem] = useState<string>();

  const anchorRef = useRef(null);

  const handleOpenChange = (isShowSelectPanel: boolean) => {
    setShowSelectPanel(isShowSelectPanel);
  };

  const handleListItemClick = (item: ListDataItem) => {
    setSelectValue(item);
    handleOpenChange(false);
    // update searchForm or value

    if (formData && formKey && setFormData) {
      // const newForm = { ...formData };
      // newForm[formKey] = item.value as T[keyof T];
      // setFormData(newForm);
      const newForm = { ...formData } as NonNullable<T>;
      newForm[formKey] = item.value as NonNullable<T>[keyof T];
      setFormData(newForm);
    }
    if (setValue) {
      setValue(item.value as P);
    }
  };

  const handleShortcutItemClick = (shortcutType: string, dateData: DateValue) => {
    setCurrentShortcutItem(shortcutType);
    setDateValue(dateData as [DateValuePiece, DateValuePiece]);
    handleCalendarChange(dateData);
  };

  const getReadableDateString = (dateValue: DateValue) => {
    if (Array.isArray(dateValue) && dateValue[0] && dateValue[1]) {
      return `${dayjs(dateValue[0]).format("YYYY-MM-DD")} ${dayjs(dateValue[1]).format("YYYY-MM-DD")}`;
    } else {
      return "All";
    }
  };

  const handleCalendarChange = (dateValue: DateValue) => {
    // console.log("data", dateValue);
    setCurrentShortcutItem("Custom");
    setDateValue(dateValue);
    // update searchFrom date
    // const newForm = { ...formData };
    // newForm[formKey] = dateValue as T[keyof T];
    // setFormData(newForm);
    if (formData && formKey && setFormData) {
      const newForm = { ...formData } as NonNullable<T>;
      newForm[formKey] = dateValue as NonNullable<T>[keyof T];
      setFormData(newForm);
    }
  };

  const cleanSelectDate = () => {
    setCurrentShortcutItem(undefined);
    handleCalendarChange([null, null]);
  };

  // useEffect(() => {
  //   const newForm = { ...formData };
  //   // const newForm = formData;
  //   if (type === "list") {
  //     newForm[formKey] = selectValue?.value as T[keyof T];
  //   } else {
  //     newForm[formKey] = dateValue as T[keyof T];
  //   }
  //   setFormData(newForm);
  // }, [selectValue, dateValue, formKey, type, setFormData]); // add formData will cause re-render

  useEffect(() => {
    if (formData && formKey) {
      if (type === "list" && listData) {
        const selectedItem = listData.find((item) => item.value === formData[formKey]);
        setSelectValue(selectedItem);
      } else if (type === "date") {
        setDateValue(formData[formKey] as DateValue);
      }
    }
  }, [formData, formKey, listData, type]);

  useEffect(() => {
    if (value && listData) {
      const selectedItem = listData.find((item) => item.value === value);
      setSelectValue(selectedItem);
    }
  }, [value, listData]);

  return (
    <div className={classes.searchSelectWrap}>
      <Popover.Root
        open={showSelectPanel}
        // className={classes.radixPopoverRoot}
        onOpenChange={handleOpenChange}
      >
        <Popover.Trigger ref={anchorRef}>
          <div
            className={`${classes.searchSelectButtonWrap} ${direction === "column" ? classes.columnFlex : ""}`}
          >
            <span className={classes.label}>{label}:&nbsp;</span>
            <div className={classes.selectButton}>
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
                      onClick={() => handleShortcutItemClick(item.label, item.getValue())}
                      className={`${classes.shortcutItem} ${currentShortcutItem === item.label ? classes.selectedChortcutItem : ""}`}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
              <div>
                <Calendar
                  showDoubleView={true}
                  selectRange={true}
                  // onChange={setDateValue}
                  onChange={handleCalendarChange}
                  value={dateValue}
                  showNavigation={true}
                  showNeighboringMonth={false}
                  locale="en-US"
                  minDetail="month"
                  maxDetail="month"
                  returnValue="range"
                />
                <div onClick={cleanSelectDate} className={classes.cleanData}>
                  Clean Data
                </div>
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
