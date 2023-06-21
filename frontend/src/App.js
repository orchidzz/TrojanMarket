import "./App.css";
import { Container } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import NavBar from "./components/navbar/navbar";
import NewItemForm from "./components/items/newItemForm";
import SettingsPage from "./components/user/settings";
import MainPage from "./components/pages/main";
import SearchPage from "./components/pages/search";
import ListedItemsPage from "./components/pages/listed";
import ListedItemCard from "./components/items/listedItemCard";
function App() {
    return (
        <div className="App">
            <Container className="container" maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home" element={<MainPage />} />
                    <Route
                        path="/profile"
                        element={[<NavBar />, <SettingsPage />]}
                    />
                    <Route
                        path="/add"
                        element={[<NavBar />, <NewItemForm />]}
                    />
                    <Route path="/sold" element={<ListedItemsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
