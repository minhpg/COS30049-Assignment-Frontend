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

import { getTopNFTs } from "../../../../api/models/NFTs";
import { TooltipPreviewImage } from "../../../../components/PreviewImage";

const CardNFT = () => {
  const [isLoading, setIsLoading] = useState(true);

  const cols = [
    {
      key: 1,
      label: `ID`,
    },
    {
      key: 2,
      label: "Name",
    },
    {
      key: 4,
      label: "Collection",
    },
    {
      key: 3,
      label: "Txn Count",
    },
  ];

  const list = useAsyncList({
    async load({ signal }) {
      let res = await getTopNFTs(20, { signal });
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
    <>
      <Card>
        <CardHeader className="px-7 pt-6 -mb-2">
          <h2 className="font-bold text-xl">Trending NFTs</h2>
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
                <TableRow key={item.id}>
                  <TableCell>
                    <Tooltip
                      placement="right"
                      content={
                        <div className="flex flex-col justify-center w-48 p-2">
                          <TooltipPreviewImage
                            urls={item.image_urls}
                            alt={item.id}
                          />
                          <a className="font-bold underline mt-2 mx-auto">{item.name}</a>
                        </div>
                      }
                    >
                      <span className="hover:underline">{item.id}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.collection}</TableCell>
                  <TableCell>{item.transaction_count}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default CardNFT;
