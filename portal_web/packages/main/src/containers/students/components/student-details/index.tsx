import { FC, useEffect, useState } from "react";
import { Edit2, Trash } from "react-feather";
import { Heading, Text, Button, Row, Col } from "@doar/components";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { renderFullAddress } from "@doar/shared/utils";
import moment from "moment";
import ModalForm from "src/containers/students/components/modal-form";
import ModalDelete from "src/containers/students/components/modal-delete";
import Label from "src/components/apps/contacts/label-2";
import { StyledBar, StyledBtnWrap } from "./style";

interface IProps {
  student?: StudentResponseDTO;
  showFormModal: boolean;
  closeFormModal: () => void;
  openFormModal: () => void;
}

const StudentDetails: FC<IProps> = ({
  student,
  showFormModal,
  closeFormModal,
  openFormModal,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit) {
      openFormModal();
    }
  }, [isEdit]);

  const handleDeleteModal = () => {
    setShowDelete((prev) => !prev);
  };
  if (!student)
    return (
      <div>
        <ModalForm
          isEdit={false}
          show={showFormModal}
          onClose={closeFormModal}
        />
      </div>
    );

  const Separator = () => <div style={{ marginTop: "30px" }} />;

  return (
    <>
      <StyledBar>
        {!student && "Selecione um aluno"}
        <Heading mb="0px">Dados pessoais</Heading>
        <StyledBtnWrap>
          <Button
            size="sm"
            color="white"
            mr="5px"
            hasIcon
            iconSpace="5px"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <Edit2 />
            <Text as="span" display={["none", "inline"]}>
              Editar
            </Text>
          </Button>
          <Button
            size="sm"
            color="white"
            hasIcon
            iconSpace="5px"
            onClick={handleDeleteModal}
          >
            <Trash />
            <Text as="span" display={["none", "inline"]}>
              Excluir
            </Text>
          </Button>
        </StyledBtnWrap>
      </StyledBar>
      <Row>
        <Col col={4} sm>
          <Label>Nome completo</Label>
          <Text>{student?.name}</Text>
        </Col>
        <Col col={4} sm>
          <Label>CPF</Label>
          <Text>{student.cpf}</Text>
        </Col>
        <Col col={4} sm>
          <Label>Nascimento</Label>
          <Text>{moment(student.birthdate).format("DD/MM/YYYY")}</Text>
        </Col>
      </Row>
      <Separator />
      <Row>
        <Col col={3} sm>
          <Label>Faixa</Label>
          <Text>{student?.belt?.name}</Text>
        </Col>
        <Col col={3} sm>
          <Label>Grau</Label>
          <Text>{student.beltDegreeColor?.name}</Text>
        </Col>
      </Row>
      <Heading mt="40px" mb="20px">
        Contatos
      </Heading>
      <Row gutters={20}>
        <Col col={6} sm={4}>
          <Label>Celular</Label>
          <Text fontFamily="rubik">{student.phone}</Text>
        </Col>
        <Col col={6} sm={4}>
          <Label>E-mail</Label>
          <Text fontFamily="rubik">{student.email}</Text>
        </Col>
      </Row>
      <Separator />
      <Row gutters={20}>
        <Col col={12} sm={12}>
          <Label>Endereço</Label>
          <Text fontFamily="rubik">{renderFullAddress(student.address)}</Text>
        </Col>
      </Row>
      <ModalForm
        isEdit
        studentToEdit={student}
        show={showFormModal}
        onClose={() => {
          setIsEdit(false);
          closeFormModal();
        }}
      />
      <ModalDelete
        student={student}
        show={showDelete}
        onClose={handleDeleteModal}
      />
    </>
  );
};

export default StudentDetails;
