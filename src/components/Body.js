import RestaurantCard ,{withPromotedLabel}from "./RestaurantCard";
import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{
 
   //Local State Variable 
   const[listOfRestaurants ,setListOfRestaurant]=useState(resList);
   const[filteredRestaurant , setFilteredRestaurant] =useState(resList);

   const[searchText , setSearchText] = useState("");
   const RestaurantCardPromoted =withPromotedLabel(RestaurantCard);

    //when state variables update,react triggers a reconciliation cycle (re-render the component)

   useEffect(() => {
      fetchData();
   },[]);

   const fetchData = async () => {
     const data = await fetch(
        MENU_API 
      );

      const json = await data.json();
      console.log(json);
      //optional chaining
      setListOfRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   };

   const onlineStatus =useOnlineStatus ();
   if(onlineStatus == false)return<h1> 
      Looks like you're offline!! please check your internet connection;
   </h1>

   

   //conditional rendering
   return listOfRestaurants.length == 0 ?  (
   <Shimmer/> ) : (
     <div className="body">
        <div className="filter flex">
         <div className="search m-4 p-4">
            <input
             type ="text"
              className="border border-solid border-black" 
              value={searchText}
               onChange={(e) => {
                 setSearchText(e.target.value);
            }}
            />
            <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
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
         <div className="search m-4 p-4 flex items-center">
         <button
          className="px-4 py-2 bg-gray-100 rounded-lg" 
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
         </div>
        <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant )=> (
         < Link 
         key = {restaurant.info.id}
         to={"/restaurants/" + restaurant.info.id}
         >
       {restaurant.info.Promoted? (
         <RestaurantCardPromoted  resData ={restaurant}/> 
      ):(
          <RestaurantCard  resData ={restaurant}/> 
          )}
          </Link>
     ))}
        </div>
     </div>
    );
   };
 export default Body;