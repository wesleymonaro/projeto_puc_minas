import {
  DollarSign,
  User,
  Octagon,
  UserPlus,
  CheckSquare,
  BarChart,
} from "react-feather";

const menus = [
  {
    id: 1,
    label: "Alunos",
    url: "/",
    Icon: User,
    submenu: [
      {
        id: 11,
        label: "Listar Alunos",
        url: "/alunos",
        Icon: User,
      },
    ],
  },
  {
    id: 2,
    label: "Instrutores",
    url: "/",
    Icon: User,
    submenu: [
      {
        id: 21,
        label: "Listar instrutores",
        url: "/instrutores",
        Icon: User,
      },
    ],
  },
  {
    id: 3,
    label: "Treinos",
    url: "/",
    Icon: Octagon,
    submenu: [
      {
        id: 31,
        label: "Listar treinos",
        url: "/treinos",
        Icon: Octagon,
      },
    ],
  },
  {
    id: 4,
    label: "Presenças",
    url: "/",
    Icon: CheckSquare,
    submenu: [
      {
        id: 41,
        label: "Listar presenças",
        url: "/presencas",
        Icon: CheckSquare,
      },
      {
        id: 42,
        label: "Cadastrar Presença",
        url: "/presencas/cadastro",
        Icon: CheckSquare,
      },
    ],
  },
  {
    id: 5,
    label: "Pagamentos",
    url: "/",
    Icon: DollarSign,
    submenu: [
      {
        id: 51,
        label: "Listar pagamentos",
        url: "/pagamentos",
        Icon: DollarSign,
      },
      {
        id: 52,
        label: "Registrar pagamento",
        url: "/pagamentos/registrar",
        Icon: DollarSign,
      },
    ],
  },
  {
    id: 6,
    label: "Relatórios",
    url: "/",
    Icon: BarChart,
    submenu: [
      {
        id: 61,
        label: "Listar presenças",
        url: "/presencas",
        Icon: BarChart,
      },
      {
        id: 62,
        label: "Cadastrar Presença",
        url: "/presencas/cadastro",
        Icon: BarChart,
      },
    ],
  },
];

export default menus;
