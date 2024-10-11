import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './Store'; // Tambahkan reset

const Counter = () => {
  const count = useSelector((state) => state.count);  // Ambil nilai dari Redux state
  const dispatch = useDispatch();  // Dispatch ke Redux

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hitung: {count}</h1>
      
      {/* Button + */}
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginRight: '10px',
        }}
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      
      {/* Button - */}
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginRight: '10px',
        }}
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      
      {/* Button reset */}
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginLeft: '10px',
        }}
        onClick={() => dispatch(reset())}  // reset
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;

