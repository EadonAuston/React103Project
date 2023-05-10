// Will render either login or signup
import React from "react";
import SignupLogin from "../SignupLogin/SignupLogin";
import HomePage from "../HomePage/HomePage";

class Authentication extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 0,
      };
   }

   changePage = () => {
      this.setState((prevState) => ({
         page: prevState.page + 1
     })); 
   }

   

   render() {
      const {page} = this.state;
      return (
         <>
         {page === 1 ? 
         <SignupLogin changePage={this.props.changePage} getMail={this.props.getMail}/>
         :
         <HomePage 
         data={this.props.data}
         changePage={this.changePage}
         getShoppingItems={this.props.getShoppingItems}
         />
         
         }
         </>
      )
   }
}

export default Authentication;