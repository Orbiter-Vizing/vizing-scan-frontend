import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useHashSearchInputStyles } from "src/views/shared/hash-search-input/hash-search-input.styles";
import { getCurrentEnvApiUrl, evmTxHashLength, evmAddressLength } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
// assets
import SearchIcon from "src/assets/icon/search.svg?react";
import DeleteIcon from "src/assets/icon/delete.svg?react";

const initialPage = 1;
const pageSize = 10;

export const HashSearchInput = () => {
  const classes = useHashSearchInputStyles();
  const navigate = useNavigate();
  const { fetchMessagesList } = useMessagesContext();
  const apiUrl = getCurrentEnvApiUrl();

  const [inputValue, setInputValue] = useState("");

  const handleHashSearch = async () => {
    // TODO: check targetHash is valid value
    const targetHash = inputValue;
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page: initialPage,
      pageSize,
      q: targetHash,
      dateRange: [],
      protocol: [],
      sourceChain: [],
      targetChain: [],
    });
    const messagesList = messagesListResponse.list;
    if (targetHash.length === evmTxHashLength) {
      // hash case
      if (messagesList.length === 1) {
        // hash case 1: one result, get transaction id and go to detail page
        const targetTransaction = messagesList[0];
        navigate(`/tx/${targetTransaction.transactionId}`);
      } else {
        // hash case 2: list result, go to txhub page show tx list
        navigate(`/txhub/${targetHash}`);
      }
    } else if (targetHash.length === evmAddressLength) {
      // address case, go to address page show tx list
      navigate(`/address/${targetHash}`);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleHashSearch();
    }
  };

  const handleInputDeleteClick = () => {
    setInputValue("");
  };

  return (
    <div className={classes.searchInputWrap}>
      <SearchIcon className={classes.searchIcon} />
      <input
        autoFocus
        className={classes.searchInput}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search by Address or Txn Hash"
        value={inputValue}
      />
      {inputValue && <DeleteIcon onClick={handleInputDeleteClick} className={classes.deleteIcon} />}
    </div>
  );
};
