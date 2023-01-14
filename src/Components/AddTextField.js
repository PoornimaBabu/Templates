import { Grid, Button, TextField, Checkbox, Paper } from "@mui/material";

export default function AddTextField(props) {

  let {id, name, placeholder, isRequired} = props.data
  const {updateTextFieldTemplate} = props;

  const handlechange = (e) => {
    const {target} = e
    const name = target.name
    const value = (name=='isRequired')? target.checked:target.value 
    updateTextFieldTemplate(id, name, value);
  }
  
  return (
    <div>
      <Paper>
      <Grid
        container
        direction="row"
        spacing={1}
        sx={{
          boxSizing: "border-box",
          margin: '3px'
        }}
      > 
        <Grid item xs={11}>
          <Button style={{float: 'right'}}>Close</Button>
        </Grid>
        <Grid item xs={6}>
          <TextField value={name} name="name" label="Field Label" onChange={e=>handlechange(e)} />
        </Grid>
        <Grid item xs={6}>
          <TextField value={placeholder} name="placeholder" label="Place holder"  onChange={e=>handlechange(e)} />
        </Grid>
        <Grid item xs={2}>
          <Checkbox checked={isRequired} name="isRequired" label="isRequired"  onChange={e=>handlechange(e)} />
        </Grid>        
     
      </Grid>
      </Paper>
    </div>
  );
}
