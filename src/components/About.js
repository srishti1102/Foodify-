import UserClass from "./UserClass";
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
       <UserClass name={"srishti"} location={"lucknow"}/>
      </div>
        );
    }
};


export default About;