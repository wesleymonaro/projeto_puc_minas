import { Auth } from 'aws-amplify';

export type AuthCognitoRequest = {
  username: string;
  password: string;
  dojoId: string;
  role: string;
  email: string;
  name: string;
}

export const createUserInCognito = async (data: AuthCognitoRequest): Promise<void> => {
  try {
    await Auth.signUp({
      username: data.username,
      password: data.password,
      attributes: {
        'custom:dojoId': data.dojoId,
        'custom:role': data.role,
        email: data.email,
        name: data.name,
      },
    });
    return;
  } catch (error) {
    console.log(error)
  }
}
