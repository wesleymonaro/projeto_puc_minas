import { FC, useState } from "react";
import {
  Edit2,
  Trash,
  Facebook,
  Twitter,
  Instagram,
  GitHub,
} from "react-feather";
import {
  Heading,
  Text,
  Button,
  Row,
  Col,
  Nav,
  NavLink,
} from "@doar/components";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { renderFullAddress } from "@doar/shared/utils";
import moment from "moment";
import ModalForm from "src/containers/students/components/modal-form";
import ModalDelete from "src/containers/students/components/modal-delete";
import ModalEdit from "../modal-edit";
import Label from "../label-2";
import { StyledBar, StyledBtnWrap } from "./style";

interface IProps {
  person?: StudentResponseDTO;
}

const PersonalDetails: FC<IProps> = ({ person }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleEditModal = () => {
    setShowEdit((prev) => !prev);
  };
  const handleDeleteModal = () => {
    setShowDelete((prev) => !prev);
  };
  if (!person) return <div />;

  const Separator = () => <div style={{ marginTop: "30px" }} />;
  return (
    <>
      <StyledBar>
        <Heading mb="0px">Dados pessoais</Heading>
        <StyledBtnWrap>
          <Button
            size="sm"
            color="white"
            mr="5px"
            hasIcon
            iconSpace="5px"
            onClick={handleEditModal}
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
          <Text>{person?.name}</Text>
        </Col>
        <Col col={4} sm>
          <Label>CPF</Label>
          <Text>{person.cpf}</Text>
        </Col>
        <Col col={4} sm>
          <Label>Nascimento</Label>
          <Text>{moment(person.birthdate).format("DD/MM/YYYY")}</Text>
        </Col>
      </Row>
      <Separator />
      <Row>
        <Col col={3} sm>
          <Label>Faixa</Label>
          <Text>{person?.belt?.name}</Text>
        </Col>
        <Col col={3} sm>
          <Label>Grau</Label>
          <Text>{person.beltDegreeColor?.name}</Text>
        </Col>
      </Row>
      <Heading mt="40px" mb="20px">
        Contatos
      </Heading>
      <Row gutters={20}>
        <Col col={6} sm={4}>
          <Label>Celular</Label>
          <Text fontFamily="rubik">{person.phone}</Text>
        </Col>
        <Col col={6} sm={4}>
          <Label>E-mail</Label>
          <Text fontFamily="rubik">{person.email}</Text>
        </Col>
      </Row>
      <Separator />
      <Row gutters={20}>
        <Col col={12} sm={12}>
          <Label>Endereço</Label>
          <Text fontFamily="rubik">{renderFullAddress(person.address)}</Text>
        </Col>
      </Row>
      {/* <ModalForm
        isCreate={false}
        studentToEdit={person}
        show={showEdit}
        onClose={handleEditModal}
      /> */}
      <ModalDelete
        student={person}
        show={showDelete}
        onClose={handleDeleteModal}
      />
    </>
  );
};

export default PersonalDetails;
