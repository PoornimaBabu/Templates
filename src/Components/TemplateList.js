import { Grid, Button, TextField, Checkbox, Typography } from "@mui/material";
import { useContext } from "react";
import { MyTemplateContext } from "../Context/TemplateProvider";
import { useNavigate } from 'react-router-dom';

export default function TemplateList() {

  const navigate = useNavigate()

  const { setCurrentTemplate} = useContext(MyTemplateContext)

  return (
    <div>
      <Grid container >
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item xs={8}>
            <Typography variant="h3">Template List</Typography>
          </Grid>
          <Grid item xs={4}>
          <Button sx={{marginRight: 'auto', size: 'small'}} variant="contained" onClick={() => {setCurrentTemplate([]); navigate('/createtemplate')}}>Create</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>      
          {Object.keys(localStorage).map((temp, index) => <Button key={temp} onClick={() => {navigate(`/templatepreview/${temp}`)}}>{temp}</Button>)}
      </Grid>
    </Grid> 
     
    </div>
  );
}
