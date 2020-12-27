import React from "react";
import { FormField, SubmitButton, ErrorMessage } from "./forms";
import { Formik } from "formik";
import * as Yup from "yup";


function AuthForm({ fields, onSubmit, submitTitle, error }) {
  const initialValues = {};
  const validationConditions = {};
  const renderItems = [];
  var render = {};
  for (var i = 0; i < fields.length; i++) {
    switch (fields[i]) {
      case "username":
        initialValues.username = "";
        validationConditions.username = Yup.string()
          .required()
          .label("Username");
        render = (
          <FormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="Username                                              "
          />
        );
        break;
      case "password":
        initialValues.password = "";
        validationConditions.password = Yup.string()
          .required()
          .min(4)
          .label("Password");
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password                                              "
            secureTextEntry
            textContentType="password"
          />
        );
        break;
      case "passwordConfirmation":
        initialValues.passwordConfirmation = "";
        validationConditions.passwordConfirmation = Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        );
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="passwordConfirmation"
            placeholder="Confirm                                              "
            secureTextEntry
            textContentType="password"
          />
        );
        break;
      case "email":
        initialValues.email = "";
        validationConditions.email = Yup.string()
          .required()
          .email()
          .label("Email");
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email                                              "
            textContentType="emailAddress"
          />
        );
        break;
      case "code":
        initialValues.code = "";
        validationConditions.code = Yup.string()
          .required()
          .min(4)
          .label("Code");
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="code"
            placeholder="Confirmation Code                                              "
          />
        );
        break;
      case "newPassword":
        initialValues.newPassword = "";
        validationConditions.newPassword = Yup.string()
          .required()
          .min(4)
          .label("newPassword");
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="New Password                       "
            secureTextEntry
            textContentType="password"
          />
        );
        break;
      case "newPasswordConfirmation":
        initialValues.newPasswordConfirmation = "";
        validationConditions.newPasswordConfirmation = Yup.string().oneOf(
          [Yup.ref("newPassword"), null],
          "Passwords must match"
        );
        render = (
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPasswordConfirmation"
            placeholder="Confirm                       "
            secureTextEntry
            textContentType="password"
          />
        );
        break;
    }
    renderItems.push(render);
  }

  function renderChildren(components) {
    return components.map((component) => (
      <React.Fragment key={component.props.name}>{component}</React.Fragment>
    ));
  }
  const validationSchema = Yup.object().shape(validationConditions);
  return (
    <>
      <ErrorMessage error={error} visible={error} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <>
          {renderChildren(renderItems)}
          <SubmitButton title={submitTitle} />
        </>
      </Formik>
    </>
  );
}

export default AuthForm;
