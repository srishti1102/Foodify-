import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const {resId} =useParams();

    const resInfo = useRestaurantMenu(resId);
   
if(resInfo == null)
    return
    <Shimmer/>;

//const {name , cuisines ,costForTwo} = resInfo?.data?.cards[2]?.card?.card?.info;

const {itemCards} = 
resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

    return(
        <div className="menu">
            <h1> Name</h1>
            <p>
                cusines
            </p>
            <h2>Menu</h2>
            <ul>
                 {itemCards.map((item) => (
                    <li key= { item.card.info.id}>
                {itemCards[0].card.info.name}
                </li>
                 ))}
            </ul>
        </div>
    )
};

export default RestaurantMenu;