import UserClass from "./UserClass";
import User from "./User";
import React from "react";


class About extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //console.log("parent component Did Mount");
    }

    render(){
       // console.log("parent Render");
        return(
        <div>
        <h1> About class Component</h1>
        <h2> This is me</h2>
       <UserClass name={"srishti"} location={"lucknow"}/>
      </div>
        );
    }
};


export default About;