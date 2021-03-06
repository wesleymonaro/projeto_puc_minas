import { FC, useEffect, useState } from "react";
import { Edit2, Trash } from "react-feather";
import { Heading, Text, Button, Row, Col } from "@doar/components";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import { renderFullAddress } from "@doar/shared/utils";
import moment from "moment";
import ModalForm from "src/containers/teachers/components/modal-form";
import ModalDelete from "src/containers/teachers/components/modal-delete";
import Label from "src/components/apps/contacts/label-2";
import { StyledBar, StyledBtnWrap } from "./style";

interface IProps {
  teacher?: TeacherResponseDTO;
  showFormModal: boolean;
  closeFormModal: () => void;
  openFormModal: () => void;
}

const TeacherDetails: FC<IProps> = ({
  teacher,
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
  if (!teacher)
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
        {!teacher && "Selecione um instrutor"}
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
          <Text>{teacher?.name}</Text>
        </Col>
        <Col col={4} sm>
          <Label>CPF</Label>
          <Text>{teacher.cpf}</Text>
        </Col>
        <Col col={4} sm>
          <Label>Nascimento</Label>
          <Text>{moment(teacher.birthdate).format("DD/MM/YYYY")}</Text>
        </Col>
      </Row>
      <Separator />
      <Row>
        <Col col={3} sm>
          <Label>Faixa</Label>
          <Text>{teacher?.belt?.name}</Text>
        </Col>
        <Col col={3} sm>
          <Label>Grau</Label>
          <Text>{teacher.beltDegreeColor?.name}</Text>
        </Col>
      </Row>
      <Heading mt="40px" mb="20px">
        Contatos
      </Heading>
      <Row gutters={20}>
        <Col col={6} sm={4}>
          <Label>Celular</Label>
          <Text fontFamily="rubik">{teacher.phone}</Text>
        </Col>
        <Col col={6} sm={4}>
          <Label>E-mail</Label>
          <Text fontFamily="rubik">{teacher.email}</Text>
        </Col>
      </Row>
      <Separator />
      <Row gutters={20}>
        <Col col={12} sm={12}>
          <Label>Endere??o</Label>
          <Text fontFamily="rubik">{renderFullAddress(teacher.address)}</Text>
        </Col>
      </Row>
      <ModalForm
        isEdit
        teacherToEdit={teacher}
        show={showFormModal}
        onClose={() => {
          setIsEdit(false);
          closeFormModal();
        }}
      />
      <ModalDelete
        teacher={teacher}
        show={showDelete}
        onClose={handleDeleteModal}
      />
    </>
  );
};

export default TeacherDetails;
