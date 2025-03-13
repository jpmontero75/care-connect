import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_D22OIUreA",
  ClientId: "5098dk0ri5cgr7lqjaodapttpl",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
