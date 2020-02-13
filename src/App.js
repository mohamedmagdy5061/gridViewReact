import React from 'react';
import Table from './components/gridTable/Table'
import listModel from './roules-list-model';
import DataFetching from './service'


import './App.css';

function App() {

  const { data } = DataFetching('https://internal.fly365dev.com/rules/rule?page=1&orderBy=createdAt&order=desc&pageSize=50');

  return (
    <div className="App">

      <Table tableBodyDataFetched={data} listModel={listModel} /> 

    </div>
  );
}

export default App;
