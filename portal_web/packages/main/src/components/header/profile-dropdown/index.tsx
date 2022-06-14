import React from "react";
import {
  Edit3,
  User,
  HelpCircle,
  LifeBuoy,
  Settings,
  LogOut,
} from "react-feather";
import {
  DropdownToggle,
  Dropdown,
  Avatar,
  AvatarInitial,
} from "@doar/components";
import { useAppSelector } from "src/redux/hooks";
import { UserInfo } from "src/redux/slices/infos";
import { getFirstLettersFromName, renderRole } from "@doar/shared/utils";
import {
  StyledDropMenu,
  StyledAuthorName,
  StyledAuthorRole,
  StyledDropItem,
  StyledAvatar,
} from "./style";

const ProfileDropdown: React.FC = () => {
  const user: UserInfo | null = useAppSelector(
    (state) => state.infos.loggedUser
  );

  return (
    <Dropdown direction="down" className="dropdown-profile">
      <DropdownToggle variant="texted">
        <StyledAvatar size="sm" shape="circle">
          <AvatarInitial>
            {getFirstLettersFromName(user?.name || "")}
          </AvatarInitial>
        </StyledAvatar>
      </DropdownToggle>
      <StyledDropMenu>
        <Avatar size="lg" shape="circle">
          <AvatarInitial>
            {getFirstLettersFromName(user?.name || "")}
          </AvatarInitial>
        </Avatar>
        <StyledAuthorName>{user?.name}</StyledAuthorName>
        <StyledAuthorRole>{renderRole(user?.role || "")}</StyledAuthorRole>
        {/* <StyledDropItem path="/profile-view">
          <Edit3 size="24" />
          Edit Profile
        </StyledDropItem> */}
        <StyledDropItem path="/signin" mt="10px">
          <LogOut size="24" />
          Sair
        </StyledDropItem>
      </StyledDropMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
