import { Grid, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AddDropdown from "./AddDropdown";
import AddTextField from "./AddTextField";
import { MyTemplateContext } from "../Context/TemplateProvider";
import { useNavigate } from 'react-router-dom';

export default function CreateTemplate() {
  const navigate = useNavigate()
  const { dropOptions, currentTemplate, setCurrentTemplate, templateName, setTemplateName, setTemplate, template } = useContext(MyTemplateContext);

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function addtextField() {
    let newtextfield = { id: makeid(5), type:"Text", name: "", placeholder: '', isRequired: false };
    setCurrentTemplate([...currentTemplate, newtextfield]);
  }
  // { id: aUiJh,type:"Dropdown", name: "", placeholder: '', isRequired: false, options: [{id:uiJhs,value:one}] }
  function addDropdown() {
    let newtextfield = { id: makeid(5),type:"Dropdown", name: "", placeholder: '', isRequired: false, options: [] };
    setCurrentTemplate([...currentTemplate, newtextfield]);
  }

  function updateTextFieldTemplate(id, name, value) {
    const arrayItem = currentTemplate.filter(f=> f.id === id)
    arrayItem[0] = {...arrayItem[0], [name]:value}
    const res = currentTemplate.map(obj => arrayItem.find(o => o.id === obj.id) || obj);    
    setCurrentTemplate(res)
  }

  function updateDropDownTemplate(id, name, value) {

    const arrayItem = currentTemplate.filter(f=> f.id === id)
    arrayItem[0] = {...arrayItem[0], [name]:value,options:dropOptions}
    const res = currentTemplate.map(obj => arrayItem.find(o => o.id === obj.id) || obj);    

    // console.log('result 1', res)

    setCurrentTemplate(res)
  }

  function updateDropDownTemplateOptions(id) {
    // console.log('id',id)
    const arrayItem = currentTemplate.filter(f=> f.id === id)
    arrayItem[0] = {...arrayItem[0],options: dropOptions}
    // console.log('arrayItem',arrayItem)

    const res = currentTemplate.map(obj => arrayItem.find(o => o.id === obj.id) || obj);    
    // console.log('result', res)

    setCurrentTemplate(res)
  }

  function handleTemplate(e){
    setTemplateName(e.target.value)
    let temp = {}
    temp[templateName] = currentTemplate
    
    // console.log('check',temp)

  }


  function handleSubmit(e){
    setTemplateName(e.target.value)
    let temp = {}
    temp[templateName] = currentTemplate
    // templateName[templateName] = currentTemplate
    setTemplate({...template, temp})
    console.log('final value', temp)
    localStorage.setItem(templateName, JSON.stringify(temp));
  }

  return (
    <div>
      <Grid container spacing={3} direction="row">
        <Grid item xs={2}>
          <Grid container direction="column" >
            <Grid item>
              <Typography variant='h5'>Toolbox</Typography>
            </Grid>
            <Grid item>
              <Button color="warning" onClick={addtextField}>
                Textfield
              </Button>
            </Grid>
            <Grid item>
              <Button color="success" onClick={addDropdown}>
                Dropdown
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            padding: "10px",
            boxSizing: "border-box"
          }}
        >
          <Grid container direction="column" spacing={2} sx={{marginBottom: '20px'}}>
            <Grid item><Typography variant='h5'>CreateTemplate</Typography></Grid>
            <Grid item><TextField defaultValue={templateName} required size="small" placeholder="Template Name" onChange={e => setTemplateName(e.target.value)} /></Grid>
            {currentTemplate?.map((tf) =>
            tf.type === "Text" ? (
              <Grid item  key={tf.id}>
                <AddTextField data={tf} updateTextFieldTemplate={updateTextFieldTemplate} />
              </Grid>
            ) : tf.type === "Dropdown" ? (
              <Grid item  key={tf.id} >
                <AddDropdown data={tf} updateDropDownTemplate={updateDropDownTemplate}  updateDropDownTemplateOptions={updateDropDownTemplateOptions} />
              </Grid>
            ) : null
          )}
          </Grid> 
          <Grid container direction="row" spacing={2}>
          <Grid item><Button variant="outlined" onClick={(e) => {handleTemplate(e); navigate('/templatepreview')}}>Preview</Button>     </Grid>
          <Grid item><Button variant="outlined" onClick={(e) => {handleSubmit(e); navigate('/')}}>Submit</Button>   </Grid>
          </Grid>
  
        </Grid>
      </Grid>
    </div>
  );
}
