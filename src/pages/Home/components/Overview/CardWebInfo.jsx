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
    key: "4",
    title: "Transactions",
    value: 6071027
  },
  {
    key: "5",
    title: "Traders",
    value: 532945
  },
  {
    key: "1",
    title: "NFTs",
    value: 4678242
  },
  {
    key: "6",
    title: "Collections",
    value: 4624
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

const CardWebInformation = () => {
  return (
    <Card className="w-full">
      <CardHeader class="px-7 pt-4">
        <h2 className="font-bold text-xl">Statistics</h2>
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
                <TableCell className="font-light text-right">{numberWithCommas(item.value)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default CardWebInformation;
