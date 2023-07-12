import { React, useEffect } from "react";
import NavBar from "../navbar/navbar";
import ItemGrid from "../items/itemGrid";
import ItemCard from "../items/itemCard";
import { getItemsAction } from "../../actions/itemActions";
import { connect, useDispatch } from "react-redux";

function MainPage({ cards }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItemsAction());
    }, []);
    return (
        <>
            <NavBar />
            <ItemGrid items={cards} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        cards: state.getItemsReducer.items.map((item) => {
            return (
                <ItemCard
                    itemId={item.itemId}
                    title={item.title}
                    price={item.price}
                    imgs={item.imgs}
                    description={item.description}
                    seller={item.seller}
                />
            );
        }),
    };
};
export default connect(mapStateToProps)(MainPage);
