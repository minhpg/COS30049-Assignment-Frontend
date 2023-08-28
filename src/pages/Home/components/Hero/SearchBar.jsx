import {
  Card,
  CardBody,
  Input,
  Listbox,
  ListboxItem,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import { useState } from "react";
import AddressInfomationModal from "../Modal/AddressInfomationModal";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const [searchFocus, setSearchFocus] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      onFocus={() => setSearchFocus(true)}
      onBlur={() => setSearchFocus(false)}
    >
      <AddressInfomationModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="grid grid-cols-12 justify-between gap-2">
        <Select label="Filter" className="col-span-12 sm:col-span-4" size="sm">
          <SelectItem key={1} value={1}>
            Filter 1
          </SelectItem>
        </Select>
        <Input
          size="sm"
          className="col-span-12 sm:col-span-8"
          radius="md"
          label={`Search by address/txn`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center relative">
        <Card
          className={`bg-opacity-50 w-full absolute mt-2 transition-[height] duration-150 ease-in-out ${
            search.length > 0 && searchFocus ? "h-auto max-h-40" : "h-0"
          }`}
        >
          <CardBody className="p-1">
            <Listbox aria-label="Results">
              {Array(search.length)
                .fill()
                .map((index) => {
                  return (
                    <ListboxItem key={index} onClick={() => {
                        onOpen()
                    }}>
                      #asdasd
                    </ListboxItem>
                  );
                })}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SearchBar;
