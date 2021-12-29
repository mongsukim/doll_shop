import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'; 
import { createStore, combineReducers } from 'redux';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if( 액션.type === 'alert닫기'){
    state = false;
    return state;
  } else{
    return state
  }
}

let 초기값 = [
    {id:0, name:'인형1', quan:2 },
    {id:1, name:'인형2', quan:1}
    ];
  
function reducer(state = 초기값, 액션){
  if( 액션.type === '항목추가'){

    let found = state.findIndex((a)=>{ return a.id === 액션.데이터.id });
    if(found >= 0){
      let copy = [...state];
      copy[found].quan++;
      return copy
    } else{
      let copy = [...state];
      copy.push(액션.데이터);
      return copy
    }

    
  } else if( 액션.type === '수량증가'){

    let copy = [ ...state];
    copy[액션.데이터].quan++;
    return copy

  } else if(액션.type === '수량감소'){
    let copy = [ ...state];
    copy[액션.데이터].quan--;
    return copy
  } 
  else{
    return state
  }
}

let store = createStore(combineReducers({reducer, reducer2}));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
