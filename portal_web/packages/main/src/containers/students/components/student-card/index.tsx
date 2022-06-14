import { FC, MouseEvent } from "react";
import { Star, Edit2 } from "react-feather";
import { Avatar, AvatarInitial, MediaBody } from "@doar/components";
import {
  StyledMedia,
  StyledName,
  StyledSpan,
  StyledNav,
  StyledNavBtn,
} from "./style";

interface IProps {
  id: string;
  image?: string;
  color?: string;
  name: string;
  phone: string;
  activeId: string;
  belt?: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const StudentCard: FC<IProps> = ({
  id,
  image,
  color,
  name,
  phone,
  belt,
  activeId,
  onClick,
}) => {
  return (
    <StyledMedia id={id} $active={activeId === id} onClick={onClick}>
      <Avatar size="sm" status="offline">
        {image && <img src={image} alt={name} />}
        {!image && (
          <AvatarInitial bg={color}>{name.substring(0, 1)}</AvatarInitial>
        )}
      </Avatar>
      <MediaBody ml="10px">
        <StyledName>{name}</StyledName>
        <StyledSpan>{phone}</StyledSpan>
        <StyledSpan>{belt}</StyledSpan>
      </MediaBody>
      {/* <StyledNav>
        <StyledNavBtn>
          <Edit2 />
        </StyledNavBtn>
      </StyledNav> */}
    </StyledMedia>
  );
};

export default StudentCard;
