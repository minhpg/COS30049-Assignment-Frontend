import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Tooltip,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import { Link } from "react-router-dom";

import { getLatestTransactions } from "../../../../api/models/Transactions";
import { truncateAddress } from "../../../../utils";


const CardTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  const cols = [
    {
      key: 1,
      label: `Txn Hash`,
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
                    <Link to={`/transaction/${item.hash}`} className="text-primary hover:underline">
                      {truncateAddress(item.hash)}
                    </Link>
                  </TableCell>
                  <TableCell>{item.Market}</TableCell>
                  <TableCell>{`${item.Price.toPrecision(3)} ${
                    item.Crypto
                  } (${roundDollar(item.USD)})`}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p>
                      <span className="font-bold">From: </span>
                      <Tooltip content={item.Seller}>
                        <Link to={`/address/${item.Seller}`} className="hover:underline text-primary">
                          {truncateAddress(item.Seller)}
                        </Link>
                      </Tooltip>
                    </p>
                    <p>
                      <span className="font-bold">To: </span>
                      <Tooltip content={item.Buyer}>
                        <Link to={`/address/${item.Buyer}`} className="hover:underline text-primary">
                          {truncateAddress(item.Buyer)}
                        </Link>
                      </Tooltip>
                    </p>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
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
