import React from 'react';
import { dummyTopLists } from '../data/dummyData';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: 'white'
          }}
        />
      </div>
      
      {dummyTopLists.map((list, index) => (
        <div 
          key={index}
          style={{
            backgroundColor: '#222',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{list.title}</h3>
            <span>{list.date}</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {list.items.map((item, idx) => (
              <li key={idx} style={{ padding: '5px 0' }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomePage; 