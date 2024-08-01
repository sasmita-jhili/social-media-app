import { Card, Grid } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
const Authentication = () => {
  let value = 0;

  return (
    <div>
      <Grid container>
        <Grid className="h-screen overflow-hidden" item xs={7}>
          <img
            className="h-full w-full "
            src={value === 0 ? "./image/login.svg" : "./image/lg.svg"}
          />
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
              <Login/>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
