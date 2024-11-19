import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () =>{
 
   //Local State Variable 
   const[listOfRestaurants ,setListOfRestaurant]=useState(resList);
   const[filteredRestaurant , setFilteredRestaurant] =useState(resList);

   const[searchText , setSearchText] = useState("");


   //when state variables update,react triggers a reconciliation cycle (re-render the component)

   useEffect(() => {
      fetchData();
   },[]);

   const fetchData = async () => {
      const data = await fetch(
         " https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      console.log(json);
      //optional chaining
      setListOfRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   };

   

   //conditional rendering
   return listOfRestaurants.length == 0 ?  (
   <Shimmer/> ) : (
     <div className="body">
        <div className="filter">
         <div className="search">
            <input
             type ="text"
              className="search-box" 
              value={searchText}
               onChange={(e) => {
                 setSearchText(e.target.value);
            }}
            />
            <button 
            onClick={() =>{
               //filter the restro cards and update the UI
               //searchText
               console.log("searchText");

               const filteredRestaurant = listOfRestaurants.filter (
                  (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
               );
               setFilteredRestaurant(filteredRestaurant);
            }}
            >
               Search
               </button>
         </div>
         <button
          className="filter-btn" 
         onClick={() =>{
           const filteredList =listOfRestaurants.filter(
               (res) => res.info.avgRating > 4.5
            );
            setListOfRestaurant(filteredList);
         }}
            >
                Top Rated Restaurants
                </button>
         </div>
        <div className="res-container">
        {filteredRestaurant.map((restaurant )=> (
         <RestaurantCard key={restaurant.info.id} resData ={restaurant}/> 
     ))}
        </div>
     </div>
    );
 };
 export default Body;