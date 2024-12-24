import "./App.css";
import aiLogo from "./assests/assets/nimbuslogo.svg";
import addBtn from './assests/assets/add-30.png'
import msgIcon from './assests/assets/message.svg'
import home from './assests/assets/home.svg'
import saved from './assests/assets/bookmark.svg'
import rocket  from './assests/assets/rocket.svg'
import sendBtn  from './assests/assets/send.svg'
import userIcon from './assests/assets/user-icon.png'
import imgLogo  from './assests/assets/nimbus.svg'
import { sendMsgToOpenAI } from "./openai";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null)

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
    text: "Hello! I'm NimbusAI, your intelligent question-answering assistant. I'm here to help you with any questions you have, whether they're about technology, science, history, or just everyday curiosities. With my advanced natural language processing and machine learning capabilities, I can understand and respond to a wide range of topics, providing you with accurate and up-to-date information. Feel free to ask me anything",
    isBot: true,

    }
  ])

  useEffect(()=>{
    msgEnd.current.scrollIntoView()
  },[messages])

  const handleSend = async () => {
    const text = input;
    setInput('')
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text)
    setMessages([
      ...messages,
      {text, isBot:false},
      {text: res, isBot:true}
    ])
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter') handleSend()
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text)
    setMessages([
      ...messages,
      {text, isBot:false},
      {text: res, isBot:true}
    ])
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={aiLogo} alt="Logo" className="logo" />
            <span className="brand">NimbusAI</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is programming ?"}>
              <img src={msgIcon}  alt="Query" />
              What is programming ?
            </button>

            <button className="query" onClick={handleQuery} value={"How to use an API ?"}>
              <img src={msgIcon} alt="Query" />
              How to use an API ?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />
            Saved
          </div>

          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => 
              <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className='chatimg' src={message.isBot?imgLogo:userIcon} alt="" /><p>{ message.text }</p>
              </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send a message" value={input} onKeyDown={handleEnter} onChange={(e) => {setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>Information provided by NimbusAI might be inaccurate about people, places or factss</p>
        </div>
      </div>
    </div>
  );
}

export default App;
