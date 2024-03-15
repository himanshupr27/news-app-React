import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

export class App extends Component {
  pSize=9;
  render() {
    return (
      <div>
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<><News pageSize={this.pSize} country="in" category="general" /></>}/>
            <Route path="/business" element={<><News pageSize={this.pSize} country="in" category="business"/></>}/>
            <Route path="/entertainment" element={<><News pageSize={this.pSize} country="in" category="entertainment" /></>}/>
            <Route path="/health" element={<><News pageSize={this.pSize} country="in" category="health" /></>}/>
            <Route path="/science" element={<><News pageSize={this.pSize} country="in" category="science" /></>}/>
            <Route path="/sports" element={<><News pageSize={this.pSize} country="in" category="sports" /></>}/>
            <Route path="/technology" element={<><News pageSize={this.pSize} country="in" category="technology" /></>}/>

          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
