import React from 'react';

const Item = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.status}</p>
      <p>{item.link}</p>
    </div>
  )
}

export default Item;
