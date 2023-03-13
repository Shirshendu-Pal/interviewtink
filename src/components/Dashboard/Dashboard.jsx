import { Card, Grid, Pagination, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import * as api from "../api";

const Dashboard = () => {
  const [pageSize, setpageSize] = useState(9);
  const [pokemons, setpokemons] = useState();
  const [count, setcount] = useState();
  const [page, setpage] = useState(1);

  const getPokemons = async () => {
    try {
      let sendData = {
        page: 1,
        pageSize: pageSize,
      };
      // console.log("called")
      const res = await api.getAllPokemons({ params: sendData });
      console.log(res);
      if (res?.data?.success) {
        // console.log(res)
        setpokemons(res?.data?.pokemon?.pokemons);
        setcount(res?.data?.pokemon?.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const handlePageChange = async (event, value) => {
    try {
      setpage(value);
      let sendData = {
        page: value,
        pageSize: pageSize,
      };
      // console.log("called")
      const res = await api.getAllPokemons({ params: sendData });
      console.log(res);
      if (res?.data?.success) {
        // console.log(res)
        setpokemons(res?.data?.pokemon?.pokemons);
        setcount(res?.data?.pokemon?.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        container
        xs={12}
        spacing={2}
        style={{
          justifyContent: "center",
          marginTop: 20,
          padding: 10,
        }}
      >
        {pokemons?.map((pokemon) => {
          return (
            <Grid item xs={4}>
              <Card>
                <Grid container style={{ justifyContent: "center" }}>
                  <img
                    src={pokemon?.image}
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                </Grid>

                <Grid
                  container
                  style={{
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <Grid item>
                    <Typography>name: {pokemon?.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>HP: {pokemon?.hp}</Typography>
                  </Grid>
                </Grid>
                <Typography style={{ padding: 5 }}>
                  attacks: {pokemon?.attacks + ","}
                </Typography>
                <Typography style={{ padding: 5 }}>
                  abilities: {pokemon?.abilities + ","}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container style={{justifyContent:"center", marginTop: 15}}>
        <Pagination
          count={count}
          variant="outlined"
          color="success"
          onChange={handlePageChange}
        />
      </Grid>
    </>
  );
};

export default Dashboard;
