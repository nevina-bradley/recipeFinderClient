import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as recipeFinderService from '../services/RecipeFinderService';

import {useNavigate } from "react-router-dom";

const theme = createTheme();

export const Update = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')
    const [user, setUser] = useState('')
    const [rating, setRating] = useState('')
  
    useEffect(()=> {
      recipeFinderService.getById(id)
      .then(response => {
         const recipe = response.data;
         setName(recipe.Name);
         setIngredients(recipe.ingredients);
         setSteps(recipe.steps);
         setUser(recipe.user);
         setRating(recipe.rating);
      })
    },[]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const recipeFinder = {
        name: data.get('name'),
        ingredients: data.get('ingredients'),
        steps: data.get('steps'),
        user: data.get('user'),
        rating: data.get('rating')
      };
  
      recipeFinderService.updateRecipe(id,recipeFinder)
      .then(response => {
        navigate("/");
      })
  
    };

      return(
       <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Update Recipe
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="recipe-name"
                    name="name"
                    required
                    fullWidth
                    value={name}
                    onChange= {(e) => setName(e.target.value)}
                    id="name"
                    label="Recipe Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="ingredients"
                    value={ingredients}
                    onChange= {(e) => setIngredients(e.target.value)}
                    label="Ingredients"
                    name="ingredients"
                    autoComplete="Ingredients"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="steps"
                    value={steps}
                    onChange= {(e) => setSteps(e.target.value)}
                    label="Steps"
                    name="steps"
                    autoComplete="Steps"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="user"
                    required
                    fullWidth
                    value={user}
                    onChange= {(e) => setUser(e.target.value)}
                    id="user"
                    label="User"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="rating"
                    required
                    fullWidth
                    value={rating}
                    onChange= {(e) => setRating(e.target.value)}
                    id="rating"
                    label="Rating"
                    autoFocus
                  />
                </Grid>
  
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               SUBMIT
              </Button>
  
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
};