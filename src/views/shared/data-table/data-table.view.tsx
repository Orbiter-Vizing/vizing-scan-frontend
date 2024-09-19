import { FC, useState } from "react";
// Mui skeleton
import Skeleton from "@mui/material/Skeleton";
// Mui table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer, { tableContainerClasses } from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
// Mui pagination
import Pagination from "@mui/material/Pagination";
import PaginationItem, { paginationItemClasses } from "@mui/material/PaginationItem";

import { useDataTableStyles } from "src/views/shared/data-table/data-table.styles";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
// import { Icon } from "../icon/icon.view";
// import Icon

// export interface CardData {
//   id: string;
//   data: string | number | undefined;
//   prefix: string;
//   name: string;
// }

// interface DataCardProps {
//   data: CardData;
// }

enum ListDataStatus {
  SUCCESS = "success",
  LOADING = "loading",
  EMPTY = "empty",
}

const StyledTableContainer = styled(TableContainer)(() => ({
  [`&.${tableContainerClasses.root}`]: {
    position: "relative",
    backgroundColor: "transparent",
    "&::-webkit-scrollbar": {
      height: 0,
    },
    "&::-webkit-scrollbar-corner": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      borderRadius: "1px",
    },
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    border: "none",
    fontSize: 14,
    fontWeight: 400,
    color: "#ffffff",
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  [`&.${tableRowClasses.root}`]: {
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      // cursor: "pointer",
    },
    border: "1px solid #292223",
    borderLeft: "none",
    borderRight: "none",
  },
}));

const StyledPaginationItem = styled(PaginationItem)(() => ({
  [`&.${paginationItemClasses.root}`]: {
    color: "rgba(255, 255, 255, 0.4)",
  },
  [`&.${paginationItemClasses.root}.Mui-selected`]: {
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
}));

const CustomSkeleton = styled(Skeleton)({
  "&::after": {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
  },
});

export const DataTable: FC = () => {
  const classes = useDataTableStyles();
  // const endValue = typeof data.data === "number" ? data.data : parseInt(data.data as string);

  const [listDataStatus, setListDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);

  return (
    <div className={classes.dataTableWrap}>
      {/* <StyledTableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="left">Nonce</StyledTableCell>
              <StyledTableCell align="left">From</StyledTableCell>
              <StyledTableCell align="left">Source Tx Hash</StyledTableCell>
              <StyledTableCell align="left">Destination Tx Hash</StyledTableCell>
              <StyledTableCell align="left">Protocol</StyledTableCell>
              <StyledTableCell align="left">Time（UTC）</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDataStatus === ListDataStatus.SUCCESS &&
              messagesList.length &&
              messagesList.map((row) => {
                const statusAttr = getStatusDisplay(row.status);
                const formatTimeText = calculateRelativeTime(row.time);
                return (
                  <StyledTableRow
                    // onClick={(e) => handleHashNavigate(e, row.transactionId)}
                    key={row.id}
                  >
                    <StyledTableCell align="left">
                      <StatusIcon status={statusAttr} text={statusAttr} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.rowNonceCell}>{row.nonce}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div
                        onClick={() => handleAddressClick(row.from)}
                        className={classes.addressCell}
                      >
                        {row.from}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.hashCell}>
                        {row.sourceChain && (
                          <Icon
                            className={classes.chianIcon}
                            isRounded
                            size={20}
                            url={row.sourceChain.iconUrl}
                          />
                        )}
                        <div
                          className={classes.hashCellContent}
                          onClick={(e) => handleHashNavigate(e, row.transactionId)}
                        >
                          {row.sourceTxHash || "-"}
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.hashCell}>
                        {row.destChain && (
                          <Icon
                            className={classes.chianIcon}
                            isRounded
                            size={20}
                            url={row.destChain.iconUrl}
                          />
                        )}
                        <div
                          className={classes.hashCellContent}
                          onClick={(e) => handleHashNavigate(e, row.transactionId)}
                        >
                          {row.destTxHash || "-"}
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.protocol ? (
                        <div className={classes.protocolCell}>
                          <Icon
                            className={classes.protocolCellIcon}
                            isRounded
                            size={32}
                            url={row.protocol.iconUrl}
                          />
                          {row.protocol.name}
                        </div>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.timeCell}>{formatTimeText}</div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {listDataStatus === ListDataStatus.LOADING &&
              new Array(pageSize).fill(undefined).map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell colSpan={7} align="center">
                      <CustomSkeleton
                        sx={{ bgcolor: "#151515" }}
                        animation="wave"
                        variant="rounded"
                        width={"100%"}
                        height={"28px"}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {listDataStatus === ListDataStatus.EMPTY && !messagesList.length && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <div className={classes.noDataTip}>
                    <IconNoData className={classes.noDataIcon} />
                    <p className={classes.tipTitle}>Sorry, We are unable to locate this TxnHash</p>
                    <p className={classes.tipContent}>
                      VizingScan only provides an overview of the current state of the blockchain
                      such as your transaction status but we have no control over these transactions
                    </p>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {messagesListMeta && messagesListMeta.itemCount > pageSize && (
        <div className={classes.paginationWrap}>
          <Pagination
            count={messagesListMeta.pageCount}
            page={page}
            variant="text"
            shape="rounded"
            renderItem={(item) => (
              <StyledPaginationItem
                slots={{ previous: IconPreArrow, next: IconNextArrow }}
                {...item}
              />
            )}
            onChange={handlePaginationChange}
          />
        </div>
      )} */}
    </div>
  );
};
