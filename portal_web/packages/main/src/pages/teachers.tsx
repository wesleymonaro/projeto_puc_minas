import React, { useCallback, useEffect, useState } from "react";
import Teachers from "src/containers/teachers";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import { loadTeacherById, loadTeachers } from "src/services/requests";
import { AxiosError } from "axios";
import { is401, refreshToken } from "src/utils";
import Layout from "../layouts";
import SEO from "../components/seo";
import Wrapper from "../containers/teachers/components/wrapper";
import TeachersSidebar from "../containers/teachers/components/sidebar";

const TeachersListPage: React.FC = () => {
  const [allTeachers, setAllTeachers] = useState<TeacherResponseDTO[]>([]);
  const [teachers, setTeachers] = useState<TeacherResponseDTO[]>([]);
  const [selectedTeacher, setSelectedTeachers] = useState<TeacherResponseDTO>();
  const [selectedTeacherId, setSelectedTeacherId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTeacher, setIsLoadingTeacher] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await loadTeachers();
      setTeachers(data);
      setAllTeachers(data);
      setIsLoading(false);
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        loadData();
      } else {
        setIsLoading(false);
      }
    }
  };

  const loadTeacher = async (): Promise<void> => {
    try {
      if (!selectedTeacherId) return;

      setIsLoadingTeacher(true);
      const { data } = await loadTeacherById(selectedTeacherId);
      setSelectedTeachers(data);
      setIsLoadingTeacher(false);
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        loadTeacher();
      }
      setIsLoadingTeacher(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedTeacherId) {
      loadTeacher();
    }
  }, [selectedTeacherId]);

  useEffect(() => {
    if (searchText) {
      const cp = allTeachers.filter(
        (s) => s.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      setTeachers(cp);
    } else {
      setTeachers(allTeachers);
    }
  }, [searchText]);

  return (
    <Layout hasSidebar={false} hideFooter sidebarLayout={2}>
      <SEO />
      <Wrapper>
        <TeachersSidebar
          onClick={(teacher): void => {
            setSelectedTeacherId(teacher?.id);
          }}
          teachers={teachers}
          searchText={searchText}
          setSearchText={setSearchText}
          openFormModal={() => {
            setSelectedTeacherId(undefined);
            setSelectedTeachers(undefined);
            setTimeout(() => {
              setShowFormModal(true);
            }, 200);
          }}
          isLoading={isLoading}
        />
        <Teachers
          isLoading={isLoading}
          isLoadingTeacher={isLoadingTeacher}
          selectedTeacher={selectedTeacher}
          showFormModal={showFormModal}
          closeFormModal={() => setShowFormModal(false)}
          openFormModal={() => setShowFormModal(true)}
        />
      </Wrapper>
    </Layout>
  );
};

export default TeachersListPage;
