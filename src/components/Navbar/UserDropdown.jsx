import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
  Switch,
  User
} from "@nextui-org/react";

import { useDarkMode } from 'usehooks-ts'

const UserDropdown = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode()  
  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "p-0 border-small border-divider bg-background",
        arrow: "bg-default-200",
      }}
    >
      <DropdownTrigger>
        <Avatar isBordered color="default" src="/public/ban.jpeg" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name="Bao An"
              description="@ban.nc"
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: "/public/ban.jpeg",
              }}
            />
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <Switch onValueChange={(isSelected) => {
                isSelected ? enable() : disable()
              }} color="default" size="sm" className="z-10 w-16 py-0.5"></Switch>
            }
          >
            Dark mode
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" className="text-danger">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
