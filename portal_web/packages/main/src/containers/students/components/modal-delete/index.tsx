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
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { deleteStudentById } from "src/services/requests";
import { AxiosError } from "axios";
import { is401, refreshToken } from "src/utils";

interface IProps {
  show: boolean;
  student: StudentResponseDTO;
  onClose: () => void;
}

const ModalDelete: FC<IProps> = ({ show, onClose, student }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteStudentById(student.id);
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
        <Text mb="0px">Confirma a exclusão do aluno {student.name}?</Text>
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
