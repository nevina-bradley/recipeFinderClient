import { useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate } from "react-router-dom";
import * as recipeFinderService from '../services/RecipeFinderService';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

export const UserTable = () => {
    const [recipes, setRecipes]= useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        recipeFinderService.getAllRecipes()
        .then(res => {
            setRecipes(res.data);
        })
    }, [])
    const goToUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const deleteRecipe = (id) => {
        recipeFinderService.deleteRecipe(id)
        .then(()=>{
            recipeFinderService.getAllRecipes()
            .then((res)=>{
                setRecipes(res.data);
            })
        })
    }

    return (
        <div >
            <h1>Code Differently Recipe Finder</h1>
            <Table sx={{minWidth:700}}>
                <TableHead sx={{}}>
                <TableRow>
                    <TableCell>
                        Id
                    </TableCell>                        
                    <TableCell>
                        Recipe Name
                    </TableCell>
                    <TableCell>
                        Ingredients
                    </TableCell>
                    <TableCell>
                        Steps
                    </TableCell>
                    <TableCell>
                        User
                    </TableCell>
                    <TableCell>
                        Rating
                    </TableCell>
                    <TableCell align="right">
                        Actions
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        recipes.map((recipe)=> {
                            return(
                                <TableRow
                                    hover
                                    key={recipe.id}
                                >
                                    <TableCell>
                                        {recipe.id}
                                    </TableCell>
                                    <TableCell>
                                        {recipe.name}
                                    </TableCell>
                                    <TableCell>
                                        {recipe.ingredients}
                                    </TableCell>
                                    <TableCell>
                                        {recipe.steps}
                                    </TableCell>
                                    <TableCell>
                                        {recipe.user}
                                    </TableCell>
                                    <TableCell>
                                        {recipe.rating}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton component="a" onClick={()=> goToUpdate(recipe.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton component="a" onClick={()=> deleteRecipe(recipe.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) 
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}