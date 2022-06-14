import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import styled from 'styled-components'
import './Detail.scss'
import { Stockcontext } from './App.js'
import { Nav } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

let 박스 = styled.div`
  padding: 20px;
`
let 제목 = styled.h4`
  font-size: 25px;
`

function Detail(props) {
  let [alert, setAlert] = useState(true)
  let [inputData, setInputData] = useState('')
  let [pressedTab, setPressedTab] = useState(0)
  let [switchs, setSwitch] = useState(false)

  useEffect(() => {
    let Timer = setTimeout(() => {
      setAlert(false)
    }, 2000)
  }, [alert])

  let { id } = useParams()
  let history = useHistory()
  let selectedGoods = props.shoes.find(function (Goods) {
    return Goods.id == id
  })

  return (
    <div className="container">
      <박스>
        <제목>Detail</제목>
      </박스>
      <input
        onChange={(e) => {
          setInputData(e.target.value)
        }}
      ></input>
      {alert === true ? (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{selectedGoods.title}</h4>
          <p>{selectedGoods.content}</p>
          <p>{selectedGoods.price}원</p>
          <Info Stock={props.Stock}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.setStock([9, 11, 12])
              props.dispatch({
                type: 'AddItem',
                data: {
                  id: selectedGoods.id,
                  name: selectedGoods.title,
                  quan: 1,
                },
              })
              history.push('/cart')
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push('/')
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setSwitch(false)
              setPressedTab(0)
            }}
          >
            active{' '}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setSwitch(false)
              setPressedTab(1)
            }}
          >
            {' '}
            option2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={switchs} classNames="wow" timeout={500}>
        <TabContent pressedTab={pressedTab} setSwitch={setSwitch} />
      </CSSTransition>
    </div>
  )
}
function TabContent(props) {
  useEffect(() => {
    props.setSwitch(true)
  })
  if (props.pressedTab === 0) {
    return <div>0번째</div>
  } else if (props.pressedTab === 1) {
    return <div>1번째</div>
  } else if (props.pressedTab === 2) {
    return <div>2번째</div>
  }
}

function Info(props) {
  return <p>Stock:{props.Stock[0]}</p>
}

function stateToprops(state) {
  console.log(state)
  return {
    state: state.reducer,
    isalert: state.reducer2,
  }
}
export default connect(stateToprops)(Detail)
