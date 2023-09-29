import RecipeFinderTable from "../components/RecipeFinderTable";
import {useNavigate } from "react-router-dom";

const RecipeFinder =() => {
    const navigate = useNavigate();

    function addUser(){
        navigate("/add")
    }

    return(
        <>
            <RecipeFinderTable />
        </>
    )
}

export default RecipeFinder;