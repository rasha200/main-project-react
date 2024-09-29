import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Register from "./components/Register";
import Login from "./components/Login";

export default function Auth (){
    return (
        <>
            <Header/>
            <Banner/>
            <Login/>
            <Footer/>
        </>
    );
}


