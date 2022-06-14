import { FC, useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Anchor,
  Button,
  Alert,
  Spinner,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { loginRedux, UserInfo } from "src/redux/slices/infos";
import {
  KEY_ACCESS_TOKEN,
  KEY_REFRESH_TOKEN,
  KEY_USER,
} from "@doar/shared/consts";
import {
  StyledWrap,
  StyledTitle,
  StyledDesc,
  StyledLabelWrap,
  StyledBottomText,
} from "./style";

interface IFormValues {
  username: string;
  password: string;
}

const translateErrors = (text: string): string => {
  switch (text) {
    case "Incorrect username or password.":
      return "Usuário ou senha incorretos";
    default:
      return "Ocorreu um erro";
  }
};

const SigninForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormValues): Promise<void> => {
    try {
      setIsLoading(true);
      const { signInUserSession } = await Auth.signIn(
        data.username,
        data.password
      );

      const claims = signInUserSession.idToken.payload;

      const user: UserInfo = {
        id: claims.username,
        name: claims.name,
        role: claims.role,
        email: claims.email,
        dojoId: claims.dojoId,
      };

      const token = signInUserSession.idToken.jwtToken;
      const refreshToken = signInUserSession.refreshToken.token;

      dispatch(
        loginRedux({
          token,
          refreshToken,
          user,
        })
      );

      localStorage.setItem(KEY_ACCESS_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);
      localStorage.setItem(KEY_USER, JSON.stringify(user));

      setIsLoading(false);
    } catch ({ message }) {
      setError(translateErrors(message as string));
      setIsLoading(false);
    }
  };

  return (
    <StyledWrap>
      <StyledTitle>Login JJSys</StyledTitle>
      <StyledDesc>
        Bem vindo(a) de volta ao JJSys. Entre com seu usuário e senha.
      </StyledDesc>
      <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormGroup mb="20px">
          <Label display="block" mb="5px" htmlFor="username">
            Usuário
          </Label>
          <Input
            type="username"
            id="username"
            placeholder="Insira seu usuário"
            feedbackText={errors?.username?.message}
            state={hasKey(errors, "username") ? "error" : "success"}
            showState={!!hasKey(errors, "username")}
            {...register("username", {
              required: "Insira seu usuário",
              // pattern: {
              //   // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              //   message: "invalid username",
              // },
            })}
          />
        </FormGroup>
        <FormGroup mb="20px">
          <StyledLabelWrap>
            <Label display="block" mb="5px" htmlFor="password">
              Senha
            </Label>
            <Anchor path="/forgot-password" fontSize="13px">
              Esqueceu a senha?
            </Anchor>
          </StyledLabelWrap>
          <Input
            id="password"
            type="password"
            placeholder="Insira sua senha"
            feedbackText={errors?.password?.message}
            state={hasKey(errors, "password") ? "error" : "success"}
            showState={!!hasKey(errors, "password")}
            {...register("password", {
              required: "Digite sua senha",
              // minLength: {
              //   value: 6,
              //   message: "Minimum length is 6",
              // },
              // maxLength: {
              //   value: 10,
              //   message: "Minimum length is 10",
              // },
            })}
          />
        </FormGroup>
        <Button
          marginBottom={12}
          type="submit"
          color="brand2"
          fullwidth
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="xs" /> : "ENTRAR"}
        </Button>
        {!!error && <Alert color="danger">{error}</Alert>}
        <StyledBottomText>
          Ainda não tem conta?{" "}
          <Anchor path="/signup">Cadastre-se para um teste gratuito!</Anchor>
        </StyledBottomText>
      </form>
    </StyledWrap>
  );
};

export default SigninForm;
