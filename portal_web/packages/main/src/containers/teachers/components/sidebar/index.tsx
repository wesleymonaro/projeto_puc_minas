import { FC, useEffect } from "react";
import { UserPlus, Search } from "react-feather";
import {
  TabWrap,
  TabContent,
  TabPanel,
  Button,
  Input,
  Spinner,
} from "@doar/components";
import { useWindowSize } from "@doar/shared/hooks";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import ReactTooltip from "react-tooltip";
import Scrollbar from "../../../../components/scrollbar";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { toggleSidebar } from "../../../../redux/slices/ui";
import {
  StyledSidebar,
  StyledContactList,
  StyledHeader,
  StyledForm,
  SpinnerBox,
} from "./style";
import TeacherCard from "../teacher-card";

interface ITeachersSidebarProps {
  teachers: TeacherResponseDTO[];
  isLoading: boolean;
  searchText: string;
  onClick: (teacher: TeacherResponseDTO | undefined) => void;
  setSearchText: (text: string) => void;
  openFormModal: () => void;
}

const TeachersSidebar: FC<ITeachersSidebarProps> = ({
  teachers,
  onClick,
  searchText,
  setSearchText,
  openFormModal,
  isLoading,
}) => {
  const { sidebar } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width > 991.98) {
      dispatch(toggleSidebar({ isOpen: "open" }));
    }
  }, [width, dispatch]);

  return (
    <StyledSidebar $show={!sidebar}>
      <StyledHeader>
        <StyledForm>
          <Input
            type="text"
            id="post-search"
            name="post-serach"
            placeholder="Buscar instrutor"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <Button variant="texted" iconButton size="md">
            <Search />
          </Button>
        </StyledForm>
        <Button
          size="xs"
          iconButton
          data-tip="Cadastrar instrutor"
          onClick={openFormModal}
        >
          <UserPlus />
        </Button>
        <ReactTooltip place="bottom" effect="solid" />
      </StyledHeader>
      <TabWrap vertical>
        <TabContent>
          <Scrollbar top="55px">
            <TabPanel>
              <StyledContactList>
                {isLoading && (
                  <SpinnerBox>
                    <Spinner size="sm" color="primary" />
                  </SpinnerBox>
                )}
                {!isLoading &&
                  teachers.map((teacher) => (
                    <TeacherCard
                      key={teacher.id}
                      id="all-1"
                      color="gray600"
                      name={teacher.name}
                      phone={teacher.phone}
                      activeId="teste"
                      belt={teacher.belt?.name}
                      onClick={() => onClick(teacher)}
                    />
                  ))}
              </StyledContactList>
            </TabPanel>
          </Scrollbar>
        </TabContent>
      </TabWrap>
    </StyledSidebar>
  );
};

export default TeachersSidebar;
