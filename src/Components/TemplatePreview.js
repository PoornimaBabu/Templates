import { Grid, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { MyTemplateContext } from "../Context/TemplateProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation  } from 'react-router-dom';

export default function TemplatePreview() {
  const { dropOptions, currentTemplate, setCurrentTemplate } = useContext(MyTemplateContext);
  const navigate = useNavigate()
  let location = useLocation();
  let url = location.pathname

  console.log('url', url)

 useEffect(()=> {
  let actualPreview = url.split('/templatepreview/')[1]
  let tsrt = JSON.parse(localStorage.getItem(actualPreview))
  if(actualPreview !== '' && actualPreview !== undefined){
    setCurrentTemplate(Object.values(tsrt)[0])
  }
 }, [location.pathname])



  return (
    <div>
      <Grid container direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item xs={10}>
          <Typography variant='h4'>Template Preview</Typography>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => navigate('/createtemplate')}>Cancel</Button>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => navigate('/')}>Close</Button>
        </Grid>

        <Grid container spacing={2} direction="row">
          
          {currentTemplate.map(fields => 
          fields.type === 'Text' ? <Grid item xs={12}><TextField label={fields.name} placeholder={fields.placeholder} required={fields.isRequired} />    </Grid>
          : fields?.type === 'Dropdown' 
          ? <Grid item xs={12}>
            <FormControl >
            <InputLabel label="Select Value" />
            <Select sx={{ m: 1, width: 200 }}>
              {fields.options.map(option => <MenuItem>{option.name}</MenuItem>)}
            </Select>   
            </FormControl> 
            </Grid>
          : null
          )}
       
        </Grid>
      </Grid>
    </div>
  );
}
