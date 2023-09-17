import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([])
  const [removed, setRemoved] = useState([])

  const handleUndo = (event) => {
    event.stopPropagation();
    if (list.length === 0){
      return;
    }
    const lastPosition = list[list.length -1 ]
    setRemoved((prev)=>[...prev, lastPosition])
    
    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  }
  const handleRedo = (event) => {

    event.stopPropagation();
    if (removed.length === 0){
      return;
    }
    const recovery = removed[removed.length -1]

    setRemoved((prev)=> {
      const newArray = [...prev].slice(0,-1)
      return newArray
    })
    setList((prev)=>[...prev, recovery])

  }
  const handleClick = (event) => {
    const position = {
      positionX : event.clientX,
      positionY : event.clientY
    }
    // adiciona no que ja existe
    setList((prev)=>[...prev, position])
    setRemoved([])
  }
  
  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item,index)=>(
        <span key={index} className='dot' style={{top : item.positionY, left : item.positionX}}/>
      ))}
    </div>
  );
}

export default App;
