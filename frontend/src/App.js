import {useState} from "react"
import { Route, Routes } from "react-router-dom";
import Forms from "./components/Forms"
import PaymentStatus from "./components/PaymentStatus";
import TransectionDetail from "./components/TransectionDetail";

function App() {
  const [orderToken,setToken]=useState({})
  const [orderDetail,setorderDetail] =useState({})
  return (
    <div className="App" >
  <Routes>

  
    <Route path="/" element={<Forms setToken={setToken}/>}/>
    <Route path="/casfree/result" element={<PaymentStatus orderToken={orderToken} setorderDetail={setorderDetail}/>} />
    <Route path="/transectionDetial" element={<TransectionDetail orderDetail={orderDetail}/> } />
    </Routes>
    </div>
  );
}

export default App;
