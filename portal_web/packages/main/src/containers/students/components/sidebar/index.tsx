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
import { StudentResponseDTO } from "src/dto/student.response.dto";
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
import StudentCard from "../student-card";

interface IStudentsSidebarProps {
  students: StudentResponseDTO[];
  isLoading: boolean;
  searchText: string;
  onClick: (student: StudentResponseDTO | undefined) => void;
  setSearchText: (text: string) => void;
  openFormModal: () => void;
}

const StudentsSidebar: FC<IStudentsSidebarProps> = ({
  students,
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
            placeholder="Buscar aluno"
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
          data-tip="Cadastrar aluno"
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
                  students.map((student) => (
                    <StudentCard
                      key={student.id}
                      id="all-1"
                      color="gray600"
                      name={student.name}
                      phone={student.phone}
                      activeId="teste"
                      belt={student.belt?.name}
                      onClick={() => onClick(student)}
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

export default StudentsSidebar;
