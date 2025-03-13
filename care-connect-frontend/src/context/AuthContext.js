import { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./../api/UserPool";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [newPswdRequired, setNewPswdRequired] = useState({});
  const api = "http://localhost:3000";
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          setUser(user);
          setUserEmail(email);
          localStorage.setItem("userEmail", email);
          user.getUserAttributes((err, attributes) => {
            if (err) {
              setRole("");
            } else {
              const roleAttr = attributes.find(
                (attr) => attr.Name === "custom:role"
              );
              roleAttr ? setRole(roleAttr.Value) : setRole("");
            }
          });
          resolve(data);
        },

        onFailure: (err) => {
          reject(err);
        },

        newPasswordRequired: (userAttributes, requiredAttributes) => {
          setNewPswdRequired({
            required: true,
            userAttributes,
            requiredAttributes,
          });
          reject(new Error("Password reset required"));
        },
      });
    });
  };

  const newPswd = (newPassword, email) => {
    return new Promise((resolve, reject) => {
      newPswdRequired.user.completeNewPasswordChallenge(
        newPassword,
        newPswdRequired.requiredAttributes,
        {
          onSuccess: (data) => {
            setUserEmail(email);
            localStorage.setItem("userEmail", email);
            setUser(user);
            resolve(data);
          },
          onFailure: (err) => {
            reject(err);
          },
        }
      );
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.signOut();
        setUser(null);
        setRole("");
        setNewPswdRequired({});
        localStorage.clear();
        resolve();
      } else {
        resolve();
      }
    });
  };

  const resetPassword = (email) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: function (data) {
          // Successfully initiated reset password request
          resolve(data);
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    });
  };

  const confirmResetPassword = (email, verificationCode, newPassword) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: function () {
          resolve("Password confirmed!");
        },
        onFailure: function (err) {
          console.error(err);
          reject(err);
        },
      });
    });
  };

  useEffect(() => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          setUser(null);
          setRole("");
        } else {
          setUser(user);
          setUserEmail(userEmail);
          localStorage.setItem("userEmail", userEmail);
          user.getUserAttributes((err, attributes) => {
            if (err) {
              setRole("");
            } else {
              const roleAttr = attributes.find(
                (attr) => attr.Name === "custom:role"
              );
              roleAttr ? setRole(roleAttr.Value) : setRole("");
            }
          });
        }
      });
    } else {
      setUser(null);
      setRole("");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        signIn,
        logout,
        resetPassword,
        confirmResetPassword,
        newPswd,
        api,
        userEmail,
        newPswdRequired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
