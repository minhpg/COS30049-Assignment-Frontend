import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
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

const CardAddressInformation = () => {
  return (
    <Card className="w-full">
      <CardHeader className="px-7 pt-5 -mb-2">
        <h2 className="text-xl font-bold">Analytics</h2>
      </CardHeader>
      <CardBody className="px-4 py-0">
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
