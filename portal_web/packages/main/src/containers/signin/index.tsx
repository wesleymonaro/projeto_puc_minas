import { FC } from "react";
import login1 from "@doar/shared/images/login-1.jpg";
import login2 from "@doar/shared/images/login-2.jpg";
import SigninForm from "../../components/signin-form";
import {
  StyledMedia,
  StyledMediaBody,
  StyledImage,
  StyledSignin,
} from "./style";

const AuthContainer: FC = () => {
  const images = [login1, login2];

  return (
    <StyledMedia>
      <StyledMediaBody>
        <StyledImage>
          <img
            src={images[Math.floor(Math.random() * images.length)]}
            alt="Login"
          />
        </StyledImage>
      </StyledMediaBody>
      <StyledSignin>
        <SigninForm />
      </StyledSignin>
    </StyledMedia>
  );
};

export default AuthContainer;
