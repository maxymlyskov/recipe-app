import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import useAuth from "../../auth/useAuth";
import {
  AppFormField,
  AppForm,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import {
  useAddAuthMutation,
  useAddUserMutation,
} from "../../store/auth/authApi";

// email and password validation
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email").nullable(),
  password: Yup.string().required().min(4).label("Password").nullable(),
  password: Yup.string().required().min(4).label("Username").nullable(),
});

function EndingScreen(props) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [addUser, { isSuccess }] = useAddUserMutation();
  const [addAuth] = useAddAuthMutation();
  const auth = useAuth();

  const register = useSelector((state) => state.register);

  const handleRegister = async ({ email, password, name }) => {
    try {
      await addUser({
        email: email,
        password: password,
        gender: register.gender,
        name: name,
        weight: register.weight,
        height: register.height,
        goal: register.goal,
        birthDate: register.birthDate,
        activity: register.activity,
      }).unwrap();
      const result = await addAuth({
        email: email,
        password: password,
      }).unwrap();
      auth.logIn(result);
    } catch (error) {
      console.log(error);
    }
    if (!isSuccess) setLoginFailed(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <AppForm
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
        styles={{ justifyContent: "space-between" }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <ErrorMessage
              visible={loginFailed}
              error="User have already registered"
            />

            <AppFormField
              placeholder="Username"
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              placeholder="Email"
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <AppFormField
              placeholder="Password"
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </View>

          <View style={styles.submitButton}>
            <SubmitButton title="Sign Up" />
          </View>
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EndingScreen;
