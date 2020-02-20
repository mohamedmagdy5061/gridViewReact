import React from 'react';
import GridViewTable from './components/gridTable/GridViewTable';
// import listModelRoules from './list-model-roules';
import listModelAirlines from './list-model-airline';
// import listModelQuestions from './list-model-questions';

// import { render } from 'react-dom';
import { Router, Link } from '@reach/router';

import './App.css';


const  AirlinesUpdate = () => (
  <div>
    <h1> update Airlines </h1>
    <Link to={listModelAirlines.baseRoute}>Airlines List</Link>
  </div>
)

const AirlinesView = () =>(
  <div>
    <h1>View Airlines </h1>
    <Link to={listModelAirlines.baseRoute} >Airlines List</Link>
  </div>
)
function App() {
  return (
    <div className="App">
      <Router>
        <GridViewTable
          path={listModelAirlines.baseRoute}
          baseUrl={listModelAirlines.baseUrl}
          baseRoute={listModelAirlines.baseRoute}
          listModel={listModelAirlines}
          requestBasePath="/airline/home"
          gridTitle={listModelAirlines.title}
        />

        <AirlinesUpdate
          path={`${listModelAirlines.baseRoute}/update/:id`}/>

        <AirlinesView
          path={`${listModelAirlines.baseRoute}/view/:id`}/>
      </Router>

      {/* <GridViewTable 
        baseUrl={listModelRoules.baseUrl}
        listModel={listModelRoules} 
        requestBasePath='/rule'
        baseRoute='/rule'
        gridTitle={listModelRoules.title}
      />  */}

      {/* <GridViewTable
         baseUrl={listModelAirlines.baseUrl}
          baseRoute={listModelAirlines.baseRoute}
          listModel={listModelAirlines}
          requestBasePath='/airline/home'
          gridTitle={listModelAirlines.title}
        /> */}

      {/* <GridViewTable 
         baseUrl={listModelQuestions.baseUrl}
          baseRoute='/faq/question'
          listModel={listModelQuestions}
          requestBasePath='/faq/question/home'
          gridTitle={listModelQuestions.title}
        /> */}
    </div>
  );
}

export default App;
