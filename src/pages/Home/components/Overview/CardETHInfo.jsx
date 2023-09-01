import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Divider,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

import { numberWithCommas } from "../../../../utils";

const rows = [
  {
    key: "4",
    title: "Market Cap",
    value: "$2.26B",
  },
  {
    key: "5",
    title: "Block Height",
    value: 18212048,
  },
  {
    key: "1",
    title: "Rec. Gas Price",
    value: "11,837.73 Mwei",
  },
  {
    key: "6",
    title: "TPS",
    value: "0.26 Txns/sec",
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

const rows_2 = [
  {
    key: "4",
    title: "Hashrate",
    value: "0.01 PH/s",
  },
  {
    key: "5",
    title: "Current Diffculty",
    value: "1.90 P",
  },
  {
    key: "1",
    title: "Mining Earnings",
    value: "0.00011683 ETC/M",
  },
  {
    key: "6",
    title: "ETC Holders",
    value: "2,697,703",
  },
];

const CardETHInfo = () => {
  return (
    <Card className="w-full">
      <CardHeader className="px-7 pt-4">
        <h2 className="font-bold text-xl">ETH Information</h2>
      </CardHeader>
      <CardBody className="px-4 py-0 grid grid-cols-12">
        <Table
          hideHeader
          aria-label="Example table with dynamic content"
          removeWrapper
          className="pb-3 pt-2 col-span-12 lg:col-span-5"
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
                  {numberWithCommas(item.value)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="hidden md:flex col-span-1 justify-center mb-5">
          <Divider orientation="vertical" />
        </div>
        <Table
          hideHeader
          aria-label="Example table with dynamic content"
          removeWrapper
          className="pb-3 pt-2 col-span-12 lg:col-span-6"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows_2}>
            {(item) => (
              <TableRow key={item.key}>
                <TableCell>{item.title}</TableCell>
                <TableCell className="font-light text-right">
                  {numberWithCommas(item.value)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default CardETHInfo;
