import { Grid, Button, TextField, Checkbox, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { MyTemplateContext } from "../Context/TemplateProvider";

export default function AddDropdown(props) {
  let {id, name, placeholder, isRequired, options} = props.data
  const {updateDropDownTemplate} = props;
  const {dropOptions, setDropOptions} = useContext(MyTemplateContext)

 
  function addNewField() {
    let newField = { id: makeid(5) };
    setDropOptions([...dropOptions, newField]);
  }

  function removeDropOption(id) { 
    const updatedArray =  dropOptions.filter(obj => obj.id !== id)
    setDropOptions(updatedArray);
  }

  const handlechange = (e) => {
    const {target} = e
    const name = target.name
    const value = (name=='isRequired')? target.checked : target.value 
    updateDropDownTemplate(id, name, value);
  }

  const handleOptionChange = (e,optionId) => {
    // console.log('calling optionId')
    const {name,value} = e.target
    const optionItem = dropOptions.filter(op=> op.id === optionId)
    optionItem[0] = {...optionItem[0], [name]:value}
    const updatedArray = dropOptions.map(obj => optionItem.find(o => o.id === obj.id) || obj);    
    setDropOptions(updatedArray)
    updateDropDownTemplate(id,'value',name);
    }

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    } 

  return (
    <div>
      <Paper>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          justifyContent: "center",
          padding: "2px",
        }}
      >
        <Grid item xs={12}>
          <Button style={{float: 'right'}}>Close</Button>
        </Grid>

        <Grid item xs={6} md={6}>
          <TextField defaultValue={name} name='name' label="Field Label" onChange={e=>handlechange(e)}/>
        </Grid>

        {/* <label>Dropdown Options</label> */}
        <Grid item xs={6} md={6}>
          <Button onClick={addNewField}>Add Dropdown</Button>
        </Grid>
        
        {dropOptions?.map((d, index) => (
          <Grid item xs={6} md={6} key={d.id} >
            <TextField placeholder='Dropdown' defaultValue={d.name} name='name' onChange={e => handleOptionChange(e, d.id)} />
            <Button onClick={() => removeDropOption(d.id)}>
              Delete
            </Button>
          </Grid>
        ))}

        <Grid item xs={6} md={6}>
          <Checkbox defaultChecked={isRequired} label="Required" onChange={e=>handlechange(e)} />
        </Grid>
        
      </Grid>
      </Paper>
    </div>
  )
}