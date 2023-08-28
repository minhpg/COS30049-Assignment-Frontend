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
      label: "Crypto",
    },
    {
      key: 4,
      label: "Price",
    },
    {
      key: 5,
      label: "Price (USD)",
    },
    {
      key: 6,
      label: "Buyer",
    },
    {
      key: 7,
      label: "Seller",
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
      <Card
        className="w-full"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={1}
              total={10}
              onChange={() => {}}
            />
          </div>
        }
      >
        <CardHeader class="px-7 pt-4">
          <h2 className="font-bold text-xl">Latest Transactions</h2>
        </CardHeader>
        <CardBody className="px-4 py-0">
          <Table
            removeWrapper
            className="py-3 min-h-[400px]"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
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
                  <TableCell>{item.Crypto}</TableCell>
                  <TableCell>{item.Price.toPrecision(3)}</TableCell>
                  <TableCell>{roundDollar(item.USD)}</TableCell>
                  <TableCell>
                    <Tooltip content={item.Buyer}>
                      <a className="hover:underline" onClick={onOpenAddress}>
                        {truncateAddress(item.Buyer)}
                      </a>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip content={item.Seller}>
                      <a className="hover:underline" onClick={onOpenAddress}>
                        {truncateAddress(item.Seller)}
                      </a>
                    </Tooltip>
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

const truncateAddress = (address) => {
  return address.substring(0, 4) + "..." + address.substring(37, 41);
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
