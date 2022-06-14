import { FC, useState, useEffect } from "react";
import { MoreHorizontal } from "react-feather";
import { TabWrap, TabList, Tab, TabContent, TabPanel } from "@doar/components";
import { useWindowSize } from "@doar/shared/hooks";
import { toggleSidebar } from "src/redux/slices/ui";
import ScrollBar from "src/components/scrollbar";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledMain, StyledBody, StyledOptionsBtn } from "./style";
import TeacherDetails from "./components/teacher-details";

interface IProps {
  layout?: 1 | 2;
  selectedTeacher: TeacherResponseDTO | undefined;
  isLoading: boolean;
  isLoadingTeacher: boolean;
  showFormModal: boolean;
  closeFormModal: (close: boolean) => void;
  openFormModal: () => void;
}

const Teachers: FC<IProps> = ({
  layout,
  selectedTeacher,
  showFormModal,
  closeFormModal,
  openFormModal,
}) => {
  const { sidebar } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarHandler = () => {
    setSidebarOpen((prev) => !prev);
    if (width && width > 992 && width < 1199.98) {
      dispatch(toggleSidebar({ isOpen: undefined }));
    }
  };
  useEffect(() => {
    if (!sidebar) {
      setSidebarOpen(false);
    }
  }, [sidebar]);

  return (
    <StyledMain
      className="main-content"
      $showSidebar={false}
      $rightSidebar={sidebarOpen}
    >
      <StyledBody $layout={2}>
        <TabWrap variation="line">
          <TabList>
            <Tab>Informações</Tab>
            <StyledOptionsBtn onClick={sidebarHandler} $layout={layout}>
              <MoreHorizontal />
            </StyledOptionsBtn>
          </TabList>
          <TabContent>
            <ScrollBar top="0">
              <TabPanel>
                <TeacherDetails
                  showFormModal={showFormModal}
                  openFormModal={openFormModal}
                  closeFormModal={() => closeFormModal(false)}
                  teacher={selectedTeacher}
                />
              </TabPanel>
            </ScrollBar>
          </TabContent>
        </TabWrap>
      </StyledBody>
    </StyledMain>
  );
};

Teachers.defaultProps = {
  layout: 1,
};

export default Teachers;
