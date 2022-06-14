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
  createTeacher,
  getAddressFromZip,
  loadBeltDegrees,
  loadBelts,
  updateTeacher,
} from "src/services/requests";
import { BeltDTO } from "src/dto/belt.response.dto";
import { TeacherRequestDTO } from "src/dto/teacher.request.dto";
import { BeltDegreeDTO } from "src/dto/belt-degree.response.dto";
import { is401, refreshToken } from "src/utils";
import { AxiosError } from "axios";
import DatePicker from "src/components/date-picker";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
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
  teacherToEdit?: TeacherResponseDTO;
  onClose: () => void;
}

const ModalForm: FC<IProps> = ({ show, onClose, isEdit, teacherToEdit }) => {
  const user: UserInfo | null = useAppSelector(
    (state) => state.infos.loggedUser
  );

  const [belts, setBelts] = useState<BeltDTO[]>([]);
  const [beltDegrees, setBeltDegrees] = useState<BeltDegreeDTO[]>([]);
  const [selectedBelt, setSelectedBelt] = useState<string>();
  const [selectedBeltDegree, setSelectedBeltDegree] = useState<string>();
  const [teacher, setTeacher] = useState<TeacherRequestDTO>({
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
      console.log(teacher);
      console.log(selectedBelt);
      console.log(selectedBeltDegree);
      if (isEdit) {
        if (teacher.id) await updateTeacher(teacher.id, teacher);
      } else {
        await createTeacher(teacher);
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
    if (teacher.address.zip.length === 8) {
      getAddressFromZip(teacher.address.zip)
        .then(({ data }) => {
          setTeacher({
            ...teacher,
            address: {
              number: teacher.address.number,
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
  }, [teacher.address.zip]);

  useEffect(() => {
    getBelts();
    getBeltDegrees();

    if (isEdit && teacherToEdit) {
      setTeacher({
        id: teacherToEdit.id,
        name: teacherToEdit.name,
        email: teacherToEdit.email,
        phone: teacherToEdit.phone,
        cpf: teacherToEdit.cpf,
        password: "",
        birthdate: moment(teacherToEdit.birthdate).format("DD/MM/YYYY"),
        paymentDate: teacherToEdit.paymentDate,
        observations: teacherToEdit.observations,
        notifyDueDate: teacherToEdit.notifyDueDate,
        startsFightAt: moment(teacherToEdit.startsFightAt).format("DD/MM/YYYY"),
        beltId: teacherToEdit.belt?.id.toString() || "",
        beltDegreeColorId: teacherToEdit.beltDegreeColor?.id.toString() || "",
        address: {
          city: teacherToEdit.address?.city || "",
          neighborhood: teacherToEdit.address?.neighborhood || "",
          number: teacherToEdit.address?.number || "",
          state: teacherToEdit.address?.state || "",
          street: teacherToEdit.address?.street || "",
          zip: teacherToEdit.address?.zip || "",
          complement: teacherToEdit.address?.complement || "",
        },
        dojoId: "",
        planId: "",
      });
    } else {
      setTeacher({
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
        <StyledTitle>{isEdit ? "Editar" : "Cadastrar"} instrutor</StyledTitle>
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
                    placeholder="Nome do instrutor"
                    value={teacher?.name}
                    onChange={(e) =>
                      setTeacher({ ...teacher, name: e.target.value })
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
                    value={teacher?.cpf}
                    onChange={(e) =>
                      setTeacher({ ...teacher, cpf: e.target.value })
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
                    value={teacher.birthdate}
                    getDate={(name, date) => {
                      setTeacher({ ...teacher, birthdate: date });
                    }}
                  />
                  {/* <Input
                type="text"
                id="birthDate"
                name="birthDate"
                placeholder="XX/XX/XXXX"
                value={teacher?.birthdate}
                onChange={(e) =>
                  setTeacher({ ...teacher, birthdate: e.target.value })
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
                value={teacher?.startsFightAt}
                onChange={(e) =>
                  setTeacher({ ...teacher, startsFightAt: e.target.value })
                }
              /> */}
                  <DatePicker
                    id="startsFightAt"
                    name="startsFightAt"
                    placeholder="XX/XX/XXXX"
                    style={{ width: "120px" }}
                    value={teacher.startsFightAt}
                    getDate={(name, date) => {
                      setTeacher({ ...teacher, startsFightAt: date });
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
                    placeholder="Telefone do instrutor"
                    value={teacher?.phone}
                    onChange={(e) =>
                      setTeacher({ ...teacher, phone: e.target.value })
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
                    placeholder="E-mail do instrutor"
                    value={teacher?.email}
                    onChange={(e) =>
                      setTeacher({ ...teacher, email: e.target.value })
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
                    value={teacher?.password}
                    onChange={(e) =>
                      setTeacher({ ...teacher, password: e.target.value })
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
                    value={teacher?.paymentDate}
                    onChange={(e) =>
                      setTeacher({ ...teacher, paymentDate: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
              <Col col>
                <Checkbox
                  id="notifyDueDate"
                  name="notifyDueDate"
                  label="Notificar Vencimento"
                  checked={teacher?.notifyDueDate}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      notifyDueDate: !teacher.notifyDueDate,
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
                  value={teacher?.observations}
                  onChange={(e) =>
                    setTeacher({ ...teacher, observations: e.target.value })
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
                    value={teacher?.address.zip}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: { ...teacher.address, zip: e.target.value },
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
                    value={teacher?.address.street}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: { ...teacher.address, street: e.target.value },
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
                    value={teacher?.address.number}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: { ...teacher.address, number: e.target.value },
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
                    value={teacher?.address.complement}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: {
                          ...teacher.address,
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
                    value={teacher?.address.neighborhood}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: {
                          ...teacher.address,
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
                    value={teacher?.address.city}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: { ...teacher.address, city: e.target.value },
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
                    value={teacher?.address.state}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        address: { ...teacher.address, state: e.target.value },
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
