import { Button, Card, Grid, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/Auth/auth.action";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 charecters")
      .required("Password is Required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUserAction({ data: values }));
  };
  return (
    <Grid container>
      <Grid className="h-screen overflow-hidden" item xs={7}>
        <img className="h-full w-full " src="./image/login.svg" />
      </Grid>
      <Grid item xs={5}>
        <div className=" px-20 flex flex-col justify-center h-full">
          <Card className="card p-8">
            <div className="flex flex-col items-center mb-5 space-y-1">
              <h1 className="text-center">Social Media</h1>
              <p className="text-center text-sm w-[70&]">
                Connecting Lives, Sharing Stories: your Social World, Your way
              </p>
            </div>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              <Form className="space-y-5">
                <div className="space-y-5">
                  <div>
                    <Field
                      as={TextField}
                      name="email"
                      placeholder="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="email"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      name="password"
                      placeholder="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                </div>
                <Button
                  sx={{ padding: ".8rem 0rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
              <p>if you don't have account ?</p>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </div>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
