import React, { useCallback, useEffect, useState } from "react";
import Students from "src/containers/students";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { loadStudentById, loadStudents } from "src/services/requests";
import { AxiosError } from "axios";
import { is401, refreshToken } from "src/utils";
import Layout from "../layouts";
import SEO from "../components/seo";
import Wrapper from "../containers/students/components/wrapper";
import StudentsSidebar from "../containers/students/components/sidebar";

const StudentsListPage: React.FC = () => {
  const [allStudents, setAllStudents] = useState<StudentResponseDTO[]>([]);
  const [students, setStudents] = useState<StudentResponseDTO[]>([]);
  const [selectedStudent, setSelectedStudents] = useState<StudentResponseDTO>();
  const [selectedStudentId, setSelectedStudentId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingStudent, setIsLoadingStudent] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await loadStudents();
      setStudents(data);
      setAllStudents(data);
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

  const loadStudent = async (): Promise<void> => {
    try {
      if (!selectedStudentId) return;

      setIsLoadingStudent(true);
      const { data } = await loadStudentById(selectedStudentId);
      setSelectedStudents(data);
      setIsLoadingStudent(false);
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        loadStudent();
      }
      setIsLoadingStudent(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      loadStudent();
    }
  }, [selectedStudentId]);

  useEffect(() => {
    if (searchText) {
      const cp = allStudents.filter(
        (s) => s.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      setStudents(cp);
    } else {
      setStudents(allStudents);
    }
  }, [searchText]);

  return (
    <Layout hasSidebar={false} hideFooter sidebarLayout={2}>
      <SEO />
      <Wrapper>
        <StudentsSidebar
          onClick={(student): void => {
            setSelectedStudentId(student?.id);
          }}
          students={students}
          searchText={searchText}
          setSearchText={setSearchText}
          openFormModal={() => {
            setSelectedStudentId(undefined);
            setSelectedStudents(undefined);
            setTimeout(() => {
              setShowFormModal(true);
            }, 200);
          }}
          isLoading={isLoading}
        />
        <Students
          isLoading={isLoading}
          isLoadingStudent={isLoadingStudent}
          selectedStudent={selectedStudent}
          showFormModal={showFormModal}
          closeFormModal={() => setShowFormModal(false)}
          openFormModal={() => setShowFormModal(true)}
        />
      </Wrapper>
    </Layout>
  );
};

export default StudentsListPage;
