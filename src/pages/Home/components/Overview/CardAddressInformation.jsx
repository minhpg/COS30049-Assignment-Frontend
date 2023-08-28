import { Card, CardBody, CardHeader } from "@nextui-org/react";
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
    value: "September 19, 2018"
  },
  {
    key: "4",
    title: "Maximum txn amount",
    value: "$5.91"
  },
  {
    key: "5",
    title: "Total received",
    value: "$123,123.23"
  },
  {
    key: "6",
    title: "Total sent",
    value: "$1,198,412.12"
  }
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
  return (
    <Card className="w-full">
      <CardHeader class="px-7 pt-4">
        <h2 className="font-bold text-xl">Address Information</h2>
      </CardHeader>
      <CardBody className="px-4 py-0">
        <Table hideHeader aria-label="Example table with dynamic content" removeWrapper className="pb-3 pt-2">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                <TableCell>{item.title}</TableCell>
                <TableCell className="font-light text-right">{item.value}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default CardAddressInformation;
