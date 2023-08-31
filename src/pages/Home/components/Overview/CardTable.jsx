import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

import { useState } from "react";
import { getLatestTransactions } from "../../../../api/models/Transactions";

import AddressInfomationModal from "../Modal/AddressInfomationModal";
import TransactionInformationModal from "../Modal/TransactionInformationModal";
import { truncateAddress } from "../../../../utils";

const CardTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  const cols = [
    {
      key: 1,
      label: `ID`,
    },
    {
      key: 2,
      label: "Market",
    },
    {
      key: 3,
      label: "Value",
    },
    {
      key: 6,
      label: "Between",
    },
  ];
  const list = useAsyncList({
    async load({ signal }) {
      let res = await getLatestTransactions(10, { signal });
      setIsLoading(false);
      console.log(res);
      return {
        items: res,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const {
    isOpen: isOpenAddress,
    onOpen: onOpenAddress,
    onOpenChange: onOpenChangeAddress,
  } = useDisclosure();

  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onOpenChange: onOpenChangeTransaction,
  } = useDisclosure();

  return (
    <>
      <AddressInfomationModal
        isOpen={isOpenAddress}
        onOpenChange={onOpenChangeAddress}
      />
      <TransactionInformationModal
        isOpen={isOpenTransaction}
        onOpenChange={onOpenChangeTransaction}
      />
      <Card>
        <CardHeader className="px-7 pt-6 -mb-2">
          <h2 className="font-bold text-xl">Recent Transactions</h2>
        </CardHeader>
        <CardBody className="px-4 py-0">
          <Table
            isHeaderSticky
            isCompact
            removeWrapper
            className="py-3 lg:h-96"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            bottomContent={
              <div className="flex lg:hidden w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={1}
                  total={10}
                  onChange={() => {}}
                />
              </div>
            }
          >
            <TableHeader columns={cols}>
              {(column) => (
                <TableColumn key={column.key} allowsSorting>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={list.items}
              isLoading={isLoading}
              loadingContent={<Spinner />}
            >
              {(item) => (
                <TableRow key={item.ID}>
                  <TableCell>
                    <a className="hover:underline" onClick={onOpenTransaction}>
                      {item.ID}
                    </a>
                  </TableCell>
                  <TableCell>{item.Market}</TableCell>
                  <TableCell>{`${item.Price.toPrecision(3)} ${
                    item.Crypto
                  } (${roundDollar(item.USD)})`}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p>
                      <span className="font-bold">From: </span>
                      <Tooltip content={item.Seller}>
                        <a className="hover:underline" onClick={onOpenAddress}>
                          {truncateAddress(item.Seller)}
                        </a>
                      </Tooltip>
                    </p>
                    <p>
                      <span className="font-bold">To: </span>
                      <Tooltip content={item.Buyer}>
                        <a className="hover:underline" onClick={onOpenAddress}>
                          {truncateAddress(item.Buyer)}
                        </a>
                      </Tooltip>
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

const roundDollar = (num) => {
  if (!num) return 0.0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(num);
};

export default CardTable;
