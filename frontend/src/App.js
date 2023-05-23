import "./App.css";
import { Container } from "@mui/system";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/homepage/homepage";
import NavBar from "./components/navbar/navbar";
import ItemGrid from "./components/items/itemGrid";
import NewItemForm from "./components/items/newItemForm";
import SettingsPage from "./components/user/settings";
import RatingDialog from "./components/user/ratingDialog";

function App() {
    return (
        <div className="App">
            <Container className="container" maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home" element={[<NavBar />, <ItemGrid />]} />
                    <Route
                        path="/profile"
                        element={[<NavBar />, <SettingsPage />]}
                    />
                    <Route
                        path="/add"
                        element={[<NavBar />, <NewItemForm />]}
                    />
                    <Route path="/sold" element={[<NavBar />, <ItemGrid />]} />
                    <Route
                        path="/search"
                        element={[<NavBar />, <ItemGrid />]}
                    />
                    {/* <RatingDialog /> */}
                </Routes>
            </Container>
        </div>
    );
}

export default App;
