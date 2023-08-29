import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

import { useState } from "react";

import { getLatestTransactions } from "../../../../api/models/Transactions";

const rows = [
  {
    key: "1",
    title: "Bought",
    value: 1213,
  },
  {
    key: "2",
    title: "Sold",
    value: 12349,
  },
  {
    key: "3",
    title: "First txn date",
    value: "September 19, 2018",
  },
  {
    key: "4",
    title: "Maximum txn amount",
    value: "$5.91",
  },
  {
    key: "5",
    title: "Total received",
    value: "$123,123.23",
  },
  {
    key: "6",
    title: "Total sent",
    value: "$1,198,412.12",
  },
];

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "value",
    label: "VALUE",
  },
];

const AddressInfomationModal = ({ isOpen, onOpenChange }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="block">
                <h3>Address Information</h3>
                <p className="text-ellipsis overflow-hidden italic">
                  0x739f15a351a00fe63408e95b9f4a3677de551fa2
                </p>
              </ModalHeader>
              <ModalBody className="py-0">
                <Table
                  hideHeader
                  aria-label="Example table with dynamic content"
                  removeWrapper
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={rows}>
                    {(item) => (
                      <TableRow key={item.key}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="font-light text-right">
                          {item.value}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Divider />
                <div className="">
                  <h4 className="font-bold">Recent Transactions</h4>
                </div>
                <TransactionTable />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const TransactionTable = () => {
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

  return (
    <Table
    isCompact
    removeWrapper
    className="py-3 overflow-x-scroll"
    sortDescriptor={list.sortDescriptor}
    onSortChange={list.sort}
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
            <a className="hover:underline">
              {item.ID}
            </a>
          </TableCell>
          <TableCell>{item.Market}</TableCell>
          <TableCell>{`${item.Price.toPrecision(3)} ${
            item.Crypto
          } (${roundDollar(item.USD)})`}</TableCell>
          <TableCell>
            <p>
              <span className="font-bold">From: </span>
              <a className="hover:underline">
                {item.Buyer}
              </a>
            </p>
            <p>
              <span className="font-bold">To: </span>
              <a className="hover:underline">
                {item.Seller}
              </a>
            </p>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
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

export default AddressInfomationModal;
