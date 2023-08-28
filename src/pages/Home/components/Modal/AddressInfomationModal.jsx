import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

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
        size="lg"
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
                <div class="">
                  <h4 class="font-bold">Recent Transactions</h4>
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

import {
  Spinner,
  Tooltip,
} from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

import { useState } from "react";
import { getLatestTransactions } from "../../../../api/models/Transactions";

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

  return (
        <Table
          removeWrapper
          className="pb-3 min-h-[200px] overflow-x-scroll"
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
                <TableCell>{item.ID}</TableCell>
                <TableCell>{item.Market}</TableCell>
                <TableCell>{item.Crypto}</TableCell>
                <TableCell>{item.Price.toPrecision(3)}</TableCell>
                <TableCell>{roundDollar(item.USD)}</TableCell>
                <TableCell>
                <a className="hover:underline">
                      {item.Buyer}
                    </a>
                </TableCell>
                <TableCell>
                <a className="hover:underline">
                      {item.Seller}
                    </a>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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

export default AddressInfomationModal;
