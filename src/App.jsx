import ForgotPassword from "./components/auth/ForgotPassword"
import Login from "./components/auth/Login"
import TaskFlow from "./components/home/LandingPage"


function App() {

  return (
    <>
      
      <TaskFlow/>
      <Login/>
      <ForgotPassword/>
    </>
  )
}

export default App
