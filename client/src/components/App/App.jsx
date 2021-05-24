import React, {useEffect, useState} from 'react';
import Loader from 'react-loader';
import {getData} from "../../utils";

const App = () => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getData('http://localhost:8000/notes').then(data => {
      setItems(data);
      setLoaded(true);
    })
  }, [])

  const renderItems = (data) => {
    return data.map((item, index) => <li key={index}>
      <div>Title: {item.title}</div>
      <div>Text: {item.text}</div>
    </li>)
  }

  return (
    <div>
      <Loader loaded={loaded}>
        <ul>
          {renderItems(items)}
        </ul>
      </Loader>
    </div>
  )
}

export default App;
