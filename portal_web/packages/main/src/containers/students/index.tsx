import { FC, useState, useEffect } from "react";
import { MoreHorizontal } from "react-feather";
import { TabWrap, TabList, Tab, TabContent, TabPanel } from "@doar/components";
import { useWindowSize } from "@doar/shared/hooks";
import { toggleSidebar } from "src/redux/slices/ui";
import ScrollBar from "src/components/scrollbar";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledMain, StyledBody, StyledOptionsBtn } from "./style";
import StudentDetails from "./components/student-details";

interface IProps {
  layout?: 1 | 2;
  selectedStudent: StudentResponseDTO | undefined;
  isLoading: boolean;
  isLoadingStudent: boolean;
  showFormModal: boolean;
  closeFormModal: (close: boolean) => void;
  openFormModal: () => void;
}

const Students: FC<IProps> = ({
  layout,
  selectedStudent,
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
                <StudentDetails
                  showFormModal={showFormModal}
                  openFormModal={openFormModal}
                  closeFormModal={() => closeFormModal(false)}
                  student={selectedStudent}
                />
              </TabPanel>
            </ScrollBar>
          </TabContent>
        </TabWrap>
      </StyledBody>
    </StyledMain>
  );
};

Students.defaultProps = {
  layout: 1,
};

export default Students;
