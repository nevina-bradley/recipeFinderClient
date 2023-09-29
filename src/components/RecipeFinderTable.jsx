import { useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
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
    TextField
} from '@mui/material';

const RecipeFinderTable = () => {
    const [recipes, setRecipes]= useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        recipeFinderService.getAllRecipes()
        .then(res => {
            setRecipes(res.data);
        })
    }, [])

    const search = () => {
        const searchRecipes = recipes.filter((recipe) => {
            return ((recipe.id.toString().includes(searchQuery)) || (recipe.name.toLowerCase().includes(searchQuery.toLowerCase())));
        });

        setRecipes(searchRecipes);
    };

    const goToUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const deleteRecipe1 = (id) => {
        recipeFinderService.deleteRecipe(id)
        .then(()=>{
            recipeFinderService.getAllRecipes()
            .then((res)=>{
                setRecipes(res.data);
            })
        })
    }

    const goToAdd = () => {
        navigate(`/add`);
    }

    return (
        <div>
            <br></br>
            <h1>Code Differently Recipe Finder</h1>
            <br></br>
            <TextField label="Search Recipes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <IconButton onClick={search}>
                <SearchIcon />
            </IconButton>
            <br></br>
            <br></br>
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
                                        <IconButton component="a" onClick={()=> deleteRecipe1(recipe.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) 
                        })
                    }
                </TableBody>
            </Table>
            <br></br>
            <br></br>
            <button onClick={()=> goToAdd()}>Add Recipe</button>
        </div>
    )
}

export default RecipeFinderTable;