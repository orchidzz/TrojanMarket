import { React, useEffect } from "react";
import NavBar from "../navbar/navbar";
import ItemGrid from "../items/itemGrid";
import { connect, useDispatch } from "react-redux";
import ListedItemCard from "../items/listedItemCard";

function ListedItemsPage({ cards }) {
    return (
        <>
            <NavBar />
            <ItemGrid items={cards} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        cards: state.userReducer.listedItems.map((item) => {
            return (
                <ListedItemCard
                    itemId={item.itemId}
                    title={item.title}
                    price={item.price}
                    imgs={item.imgs}
                    description={item.description}
                    active={item.active}
                />
            );
        }),
    };
};
export default connect(mapStateToProps)(ListedItemsPage);
