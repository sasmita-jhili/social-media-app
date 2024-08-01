import {
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/Auth/auth.action";


const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  };
  const validationSchema = {
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 charecters")
      .required("Password is Required"),
  };
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const dispatch =useDispatch();

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("handleSbmit", values);
     dispatch(registerUserAction({data:values}))
  };

  const handleChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <Grid container>
      <Grid className="h-screen overflow-hidden" item xs={7}>
        <img
          className="h-full w-full "
          src="./image/lg.svg"
        />
      </Grid>
      <Grid item xs={5}>
        <div className=" px-20 flex flex-col justify-center h-full">
          <Card className="card p-8 m-5">
            <div className="flex flex-col items-center mb-5 space-y-1">
              <h1 className="text-center">Social Media</h1>
              <p className="text-center text-sm w-[70&]">
                Connecting Lives, Sharing Stories: your Social World, Your way
              </p>
            </div>
            <Formik
              onSubmit={handleSubmit}
              // validationSchema={validationSchema}
              initialValues={initialValues}
            >
              <Form className="space-y-2">
                <div className="space-y-5">
                  <div>
                    <Field
                      as={TextField}
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="firstName"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="lastName"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
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
                  <div>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <ErrorMessage
                        name="gender"
                        component={"div"}
                        className="text-red-500"
                      />
                    </RadioGroup>
                  </div>
                </div>
                <Button
                  sx={{ padding: ".8rem 0rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
              <p>if you have already account ?</p>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
