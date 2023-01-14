import { createContext, useContext, useState } from "react";

export const MyTemplateContext = createContext();

export default function TemplateProvider({ children }) {

  let tempObj = {
    templateName1:  [ 
  {
    fieldType: "text",
    isRequired: false,
    fieldLabel: "fieldName",
    Placeholder: "DummyPlaceholder"
  },
  {
    fieldType: "dropdown",
    isRequired: false,
    fieldLabel: "fieldName",    
    option: [ 'opt1', 'opt2', 'opt3']
  }
  ],
  templateName2:  [ 
  {
    fieldType: "text",
    isRequired: false,
    fieldLabel: "fieldName",
    Placeholder: "DummyPlaceholder"
  },
  {
    fieldType: "dropdown",
    isRequired: false,
    fieldLabel: "fieldName",
    option: [ 'opt1', 'opt2', 'opt3']
  }
  ]
  }
  

  // const TemplateProvider = MyTemplateContext.Provider;
  const [textfield, setTextField] = useState([{ id: 0, name: "" }]);
  const [preview, setPreview] = useState([])
  const [template, setTemplate] = useState({})
  const [dropOptions, setDropOptions] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState([])
  const [templateName, setTemplateName] = useState('')  

  const setTextFieldFunc = (value) => {
    setTextField(value);
  };

  const data = {
    textfield,
    setTextField,
    setTextFieldFunc,
    preview,
    setPreview,
    template,
    setTemplate,
    dropOptions,
    setDropOptions,
    currentTemplate,
    setCurrentTemplate,
    templateName,
    setTemplateName,
  };

  return (
    <MyTemplateContext.Provider value={data}>
      {children}
    </MyTemplateContext.Provider>
  );
}

export function useTextfield() {
  const { setTextFieldFunc, textfield } = useContext(MyTemplateContext);
  return { setTextFieldFunc, textfield };
}
