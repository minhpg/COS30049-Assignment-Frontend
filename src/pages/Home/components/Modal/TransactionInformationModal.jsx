import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Chip,
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
import NFTInformation from "./NFTInformation";


const rows = [
  {
    key: "1",
    title: "Transaction Hash",
    value: 1213,
  },
  {
    key: "2",
    title: "Status",
    value: (
      <Chip color="success" className="-mr-2">
        Success
      </Chip>
    ),
  },
  {
    key: "3",
    title: "Timestamp",
    value: "September 19, 2018",
  },
  {
    key: "4",
    title: "From",
    value: truncateAddress("0x387e3BC919303Bf47963536ce1593988396e2091"),
  },
  {
    key: "5",
    title: "To",
    value: truncateAddress("0x8d0802559775C70fb505f22988a4FD4A4f6D3B62"),
  },
  {
    key: "6",
    title: "Crypto",
    value: "ETH",
  },
  {
    key: "6",
    title: "Value",
    value: "10.00",
  },
  {
    key: "7",
    title: "Value (USD)",
    value: "$11,980",
  },
  {
    key: "7",
    title: "Transaction Fee",
    value: "0.01",
  },
  {
    key: "7",
    title: "Gas",
    value: "10.678660701 Gwei",
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

const TransacionInformationModal = ({ isOpen, onOpenChange }) => {
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
            <div className="overflow-y-scroll no-scrollbar">
              <ModalHeader className="block">
                <h3>
                  Transaction #<span>9427137</span>
                </h3>
              </ModalHeader>
              <ModalBody className="pt-0 pb-5">
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
                <NFTInformation />
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};


export default TransacionInformationModal;
