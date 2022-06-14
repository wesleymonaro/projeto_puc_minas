import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Avatar,
  AvatarInitial,
  Heading,
  Input,
  Textarea,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Checkbox,
  Select,
  Col,
  Row,
  Container,
} from "@doar/components";
import {
  createStudent,
  getAddressFromZip,
  loadBeltDegrees,
  loadBelts,
  updateStudent,
} from "src/services/requests";
import { BeltDTO } from "src/dto/belt.response.dto";
import { StudentRequestDTO } from "src/dto/student.request.dto";
import { BeltDegreeDTO } from "src/dto/belt-degree.response.dto";
import { is401, refreshToken } from "src/utils";
import { AxiosError } from "axios";
import DatePicker from "src/components/date-picker";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import moment from "moment";
import { useAppSelector } from "src/redux/hooks";
import { UserInfo } from "src/redux/slices/infos";
import {
  StyledClose,
  StyledTitle,
  StyledDesc,
  StyledWrap,
  StyledLeft,
  StyledRight,
  StyledAvatar,
  StyledGroup,
  Separator,
} from "./style";

interface IProps {
  show: boolean;
  isEdit: boolean;
  studentToEdit?: StudentResponseDTO;
  onClose: () => void;
}

const ModalForm: FC<IProps> = ({ show, onClose, isEdit, studentToEdit }) => {
  const user: UserInfo | null = useAppSelector(
    (state) => state.infos.loggedUser
  );

  const [belts, setBelts] = useState<BeltDTO[]>([]);
  const [beltDegrees, setBeltDegrees] = useState<BeltDegreeDTO[]>([]);
  const [selectedBelt, setSelectedBelt] = useState<string>();
  const [selectedBeltDegree, setSelectedBeltDegree] = useState<string>();
  const [student, setStudent] = useState<StudentRequestDTO>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
    birthdate: "",
    paymentDate: "",
    observations: "",
    notifyDueDate: true,
    startsFightAt: "",
    beltId: "",
    beltDegreeColorId: "",
    address: {
      city: "",
      neighborhood: "",
      number: "",
      state: "",
      street: "",
      zip: "",
      complement: "",
    },
    dojoId: user?.dojoId || "",
    planId: "",
  });

  const getBelts = async (): Promise<void> => {
    try {
      const { data } = await loadBelts();
      setBelts(data);
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        getBelts();
      }
    }
  };

  const getBeltDegrees = async (): Promise<void> => {
    try {
      const { data } = await loadBeltDegrees();
      setBeltDegrees(data);
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        getBeltDegrees();
      }
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      console.log(student);
      console.log(selectedBelt);
      console.log(selectedBeltDegree);
      if (isEdit) {
        if (student.id) await updateStudent(student.id, student);
      } else {
        await createStudent(student);
      }
      onClose();
    } catch (error) {
      if (is401(error as AxiosError)) {
        await refreshToken();
        handleSave();
      }
    }
  };

  useEffect(() => {
    if (student.address.zip.length === 8) {
      getAddressFromZip(student.address.zip)
        .then(({ data }) => {
          setStudent({
            ...student,
            address: {
              number: student.address.number,
              city: data.localidade,
              neighborhood: data.bairro,
              state: data.uf,
              street: data.logradouro,
              zip: data.cep,
            },
          });
        })
        .catch((err) => {});
    }
  }, [student.address.zip]);

  useEffect(() => {
    getBelts();
    getBeltDegrees();

    if (isEdit && studentToEdit) {
      setStudent({
        id: studentToEdit.id,
        name: studentToEdit.name,
        email: studentToEdit.email,
        phone: studentToEdit.phone,
        cpf: studentToEdit.cpf,
        password: "",
        birthdate: moment(studentToEdit.birthdate).format("DD/MM/YYYY"),
        paymentDate: studentToEdit.paymentDate,
        observations: studentToEdit.observations,
        notifyDueDate: studentToEdit.notifyDueDate,
        startsFightAt: moment(studentToEdit.startsFightAt).format("DD/MM/YYYY"),
        beltId: studentToEdit.belt?.id.toString() || "",
        beltDegreeColorId: studentToEdit.beltDegreeColor?.id.toString() || "",
        address: {
          city: studentToEdit.address?.city || "",
          neighborhood: studentToEdit.address?.neighborhood || "",
          number: studentToEdit.address?.number || "",
          state: studentToEdit.address?.state || "",
          street: studentToEdit.address?.street || "",
          zip: studentToEdit.address?.zip || "",
          complement: studentToEdit.address?.complement || "",
        },
        dojoId: "",
        planId: "",
      });
    } else {
      setStudent({
        id: undefined,
        name: "",
        email: "",
        phone: "",
        cpf: "",
        password: "",
        birthdate: "",
        paymentDate: "",
        observations: "",
        notifyDueDate: true,
        startsFightAt: "",
        beltId: "",
        beltDegreeColorId: "",
        address: {
          city: "",
          neighborhood: "",
          number: "",
          state: "",
          street: "",
          zip: "",
          complement: "",
        },
        dojoId: "",
        planId: "",
      });
    }
  }, []);

  return (
    <Modal show={show} onClose={onClose} size="xl">
      <ModalBody p={["20px", "30px"]}>
        <StyledClose onClose={onClose}>×</StyledClose>
        <StyledTitle>{isEdit ? "Editar" : "Cadastrar"} aluno</StyledTitle>
        <StyledWrap>
          <StyledRight>
            <Row>
              <Col lg={5}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Nome Completo</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome do aluno"
                    value={student?.name}
                    onChange={(e) =>
                      setStudent({ ...student, name: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
              <Col lg={3}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>CPF</InputGroupText>
                  </InputGroupAddon>
                  {/* <InputMask
                mask="(+1) 999 999 9999"
                value="teste"
                onChange={() => {}}
              >
                {() => ( */}
                  <Input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="xxx.xxx.xxx-xx"
                    value={student?.cpf}
                    onChange={(e) =>
                      setStudent({ ...student, cpf: e.target.value })
                    }
                  />
                  {/* )}
              </InputMask> */}
                </InputGroup>
              </Col>
              <Col lg={4}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Nascimento</InputGroupText>
                  </InputGroupAddon>
                  <DatePicker
                    id="birthDate"
                    name="birthDate"
                    placeholder="XX/XX/XXXX"
                    style={{ width: "160px" }}
                    value={student.birthdate}
                    getDate={(name, date) => {
                      setStudent({ ...student, birthdate: date });
                    }}
                  />
                  {/* <Input
                type="text"
                id="birthDate"
                name="birthDate"
                placeholder="XX/XX/XXXX"
                value={student?.birthdate}
                onChange={(e) =>
                  setStudent({ ...student, birthdate: e.target.value })
                }
              /> */}
                </InputGroup>
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Luta desde</InputGroupText>
                  </InputGroupAddon>
                  {/* <Input
                type="text"
                id="startsFightAt"
                name="startsFightAt"
                placeholder="XX/XX/XXXX"
                value={student?.startsFightAt}
                onChange={(e) =>
                  setStudent({ ...student, startsFightAt: e.target.value })
                }
              /> */}
                  <DatePicker
                    id="startsFightAt"
                    name="startsFightAt"
                    placeholder="XX/XX/XXXX"
                    style={{ width: "120px" }}
                    value={student.startsFightAt}
                    getDate={(name, date) => {
                      setStudent({ ...student, startsFightAt: date });
                    }}
                  />
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Telefone</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Telefone do aluno"
                    value={student?.phone}
                    onChange={(e) =>
                      setStudent({ ...student, phone: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>

              <Col lg={4}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>E-mail</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="E-mail do aluno"
                    value={student?.email}
                    onChange={(e) =>
                      setStudent({ ...student, email: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>

              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Senha</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Senha de acesso"
                    value={student?.password}
                    onChange={(e) =>
                      setStudent({ ...student, password: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Faixa</InputGroupText>
                  </InputGroupAddon>
                  <Select
                    id="belt"
                    name="belt"
                    onChange={(e) => setSelectedBelt(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>
                      Faixa
                    </option>
                    {belts.map((belt) => (
                      <option key={belt.name} value={belt.id}>
                        {belt.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Grau</InputGroupText>
                  </InputGroupAddon>
                  <Select
                    id="beltColor"
                    name="beltColor"
                    onChange={(e) => setSelectedBeltDegree(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>
                      Grau
                    </option>
                    {beltDegrees.map((beltDegree) => (
                      <option key={beltDegree.name} value={beltDegree.id}>
                        {beltDegree.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Dia de vencimento</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="paymentDate"
                    name="paymentDate"
                    placeholder=""
                    value={student?.paymentDate}
                    onChange={(e) =>
                      setStudent({ ...student, paymentDate: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
              <Col col>
                <Checkbox
                  id="notifyDueDate"
                  name="notifyDueDate"
                  label="Notificar Vencimento"
                  checked={student?.notifyDueDate}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      notifyDueDate: !student.notifyDueDate,
                    })
                  }
                />
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col col>
                <Textarea
                  id="observations"
                  name="observations"
                  placeholder="Observações"
                  mb="10px"
                  value={student?.observations}
                  onChange={(e) =>
                    setStudent({ ...student, observations: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col lg={2}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>CEP</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder="CEP"
                    value={student?.address.zip}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: { ...student.address, zip: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col lg={4}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Rua</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="street"
                    name="street"
                    placeholder="Rua"
                    value={student?.address.street}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: { ...student.address, street: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col lg={2}>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Número</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="number"
                    name="number"
                    placeholder=""
                    value={student?.address.number}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: { ...student.address, number: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Complemento</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="complement"
                    name="complement"
                    placeholder=""
                    value={student?.address.complement}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: {
                          ...student.address,
                          complement: e.target.value,
                        },
                      })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Bairro</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    placeholder=""
                    value={student?.address.neighborhood}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: {
                          ...student.address,
                          neighborhood: e.target.value,
                        },
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Cidade</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder=""
                    value={student?.address.city}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: { ...student.address, city: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col col>
                <InputGroup>
                  <InputGroupAddon dir="prepend">
                    <InputGroupText>Estado</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder=""
                    value={student?.address.state}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        address: { ...student.address, state: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
          </StyledRight>
        </StyledWrap>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => handleSave()} mb={["5px", 0]}>
          Salvar
        </Button>
        <Button ml="5px" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalForm;
