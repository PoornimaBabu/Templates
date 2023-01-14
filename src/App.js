import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TemplateList from "./Components/TemplateList";
import CreateTemplate from "./Components/CreateTemplate";
import TemplatePreview from "./Components/TemplatePreview";
import AddTextField from "./Components/AddTextField";
import AddDropdown from "./Components/AddDropdown";
import TemplateProvider from "./Context/TemplateProvider";


export default function App() {
  return (
    <Router>
    <div className="App">
      <TemplateProvider>        
          <Routes>      
            <Route exact path="/" element={<TemplateList />} />
            <Route path="/templatepreview/*" element={<TemplatePreview />} />
            <Route path="/createtemplate" element={<CreateTemplate />} />
          </Routes>
      </TemplateProvider>
    </div>
    </Router>
  );
}
