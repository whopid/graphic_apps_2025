import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SortableTable from './Table';

const App = () => {
  const sampleData = [
    { id: 1, firstName: 'Amaya', lastName: 'Torphy', jobTitle: 'Legacy Group Facilitator', email: 'Rosie_Mann@gmail.com' },
    { id: 2, firstName: 'Weston', lastName: 'Huel', jobTitle: 'Regional Data Agent', email: 'Tristian_Vandervort68@yahoo.com' },
    { id: 3, firstName: 'Bridgette', lastName: 'Corwin', jobTitle: 'Internal Usability Officer', email: 'Sherman.Purdy@hotmail.com' },
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Sortable Table with Bootstrap</h2>
      <SortableTable data={sampleData} />
    </div>
  );
};

export default App;