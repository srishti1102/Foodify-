
import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            userInfo:{
                name: "Dummy",
                Location:"default",
                avatar_url:"htp://dummy-photo.com",
            },
        };

       // console.log("child constructor");
    }

     async componentDidMount(){
       //console.log("child Component did mount");
      const data=await fetch("https://api.github.com/users/srishti1102");
      const json = await data.json();
      this.setState({
        userInfo: json,
      });

    }

    render(){

        const{name , location , avatar_url} =this.state.userInfo;
      return(
        <div className="user-card">
            <img src={avatar_url}></img>
            <h2>Name:{name}</h2>
            <h3>Location:{location}</h3>
            <h4>Contact: srishti21@gmail.com</h4>
        </div>
      );
    }  
}

export default UserClass;