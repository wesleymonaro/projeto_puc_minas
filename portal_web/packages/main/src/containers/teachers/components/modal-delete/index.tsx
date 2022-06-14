import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  Spinner,
} from "@doar/components";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import { deleteTeacherById } from "src/services/requests";
import { AxiosError } from "axios";
import { is401, refreshToken } from "src/utils";

interface IProps {
  show: boolean;
  teacher: TeacherResponseDTO;
  onClose: () => void;
}

const ModalDelete: FC<IProps> = ({ show, onClose, teacher }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteTeacherById(teacher.id);
      setIsLoading(false);
      onClose();
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        handleDelete();
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>Excluir Aluno</ModalTitle>
        <ModalClose onClose={onClose}>×</ModalClose>
      </ModalHeader>
      <ModalBody>
        <Text mb="0px">Confirma a exclusão do instrutor {teacher.name}?</Text>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isLoading} color="danger" onClick={handleDelete}>
          {isLoading ? <Spinner size="xs" /> : "Excluir"}
        </Button>
        <Button color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDelete;
