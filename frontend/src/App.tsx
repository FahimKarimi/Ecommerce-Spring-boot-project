import NavBar from "./Components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import EmployeeList from "./Components/EmployeeList.tsx";
import Home from "./Components/Home.tsx";
import About from "./Components/About.tsx";
import {Toaster} from 'react-hot-toast'
import EmployeeDetail from "./Components/EmployeeDetail.tsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/employees/*" element={<EmployeeList/>}/>
                <Route path="/employees/:id" element={<EmployeeDetail/>}/>
                <Route path="/about/*" element={<About/>}/>
            </Routes>
        </div>
    )
}

export default App
