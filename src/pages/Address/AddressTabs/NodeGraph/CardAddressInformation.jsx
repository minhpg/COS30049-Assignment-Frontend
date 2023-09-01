import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  CardHeader,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";

import { useGraphContext } from "./GraphContext";

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

const CardAddressInformation = () => {
  const { address } = useGraphContext();
  const { address: currentAddress } = useParams();
  return (
    <Card className="h-full lg:h-96" shadow="none">
      <CardHeader className={`px-7 pt-6 -mb-2 text-xl justify-between block`}>
        <h2 className="font-light">Address</h2>
        <p className="font-bold break-all">{address} </p>
          <Link
            to={`/address/${address}`}
            className={`hover:underline text-primary text-sm font-light ${
              address == currentAddress ? "hidden" : ""
            }`}
          >
            View details
          </Link>
      </CardHeader>
      <CardBody className={`px-4 py-0`}>
        <Table
          hideHeader
          aria-label="Example table with dynamic content"
          removeWrapper
          className="pb-3 pt-2"
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
      </CardBody>
    </Card>
  );
};

export default CardAddressInformation;
