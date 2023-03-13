import { Card, Grid, Pagination, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import * as api from "../api";

const Dashboard = () => {
  const [pageSize, setpageSize] = useState(9);
  
  const [count, setcount] = useState();
  const [page, setpage] = useState(1);
  const listInnerRef = useRef();
  const [prevPage, setPrevPage] = useState(0);
  const [pokemons, setpokemons] = useState([]);
  const [wasLastList, setWasLastList] = useState(false);
  const [loader, setLoader] = useState(true);



useEffect(() => {
    const getPokemons = async () => {
        let sendData = {
            page: page,
            pageSize: pageSize,
          };
          const response = await api.getAllPokemons({ params: sendData });
      if (!response?.data?.pokemon?.pokemons?.length) {
        setcount(response.data.pokemon.totalDocumentCount)
        setWasLastList(true);
        return;
      }
      setPrevPage(page);
      setpokemons([...pokemons, ...response.data.pokemon.pokemons]);
    };
    if (!wasLastList && prevPage !== page) {
        getPokemons();
    }
  }, [page, wasLastList, prevPage, pokemons]);
const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
     
        if (scrollTop + clientHeight >= scrollHeight) {
          setpage(page + 1)
        }
        const getPokemons = async () => {
        let sendData = {
            page: page,
            pageSize: pageSize,
          };
          const response = await api.getAllPokemons({ params: sendData });
      if (!response?.data?.pokemon?.pokemons?.length) {
        setcount(response.data.pokemon.totalDocumentCount)
        setWasLastList(true);
        return;
      }
      setPrevPage(page);
      setpokemons([...pokemons, ...response.data.pokemon.pokemons]);
    };
    if (!wasLastList && prevPage !== page) {
        
        getPokemons();
        
    }
    if(pokemons.length === count){
        setLoader(false)
    }
    
      }

 useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
      }, [pokemons])

  return (
    <>
     {pokemons?.length!==0 && <Grid
        container
        xs={12}
        spacing={2}
        style={{
          justifyContent: "center",
          marginTop: 20,
          padding: 10,
        }}
        onScroll={onScroll}
            ref={listInnerRef}
      >
        {pokemons?.map((pokemon) => {
          return (
          
            <Grid item xs={4} 
             >
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
    }
    
      {loader&&<Grid container style={{ justifyContent: "center" }}>
        <CircularProgress style={{justifyContent:"center"}}/> 
      </Grid>}
      
    </>
  );
};

export default Dashboard;
