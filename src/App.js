import React from 'react';
import logo from './logo.svg';
import './App.css';
import { homedir } from 'os';

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.handleMainpageChange = this.handleMainpageChange.bind(this);
    this.state = {mainpage: "hoge"}
  }

  handleMainpageChange(mainpage) {
    this.setState({mainpage});
  }

  home = Home()
  profile = Profile()

  render(){
    return(
      <div>
        <RenderButton text="Home" link={this.home} onChange={this.handleMainpageChange} />
       <RenderButton text="Profile" link={this.profile} onChange={this.handleMainpageChange} />
       <div>
         {this.state.mainpage}
       </div>
      </div>
    )
  }
}

function Home(){
  return(
    <div>
    <a>this is home page</a>
    </div>
  );
}
function Profile(){
  return(
    <div>
    <a>this is Profile page</a><br />
    <a>name: Mikazuki Laisa</a>
    </div>
  );
}

class RenderButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onChange(this.props.link);
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    return (
       <input type="button" value={this.props.text} onClick={this.handleClick}/>
    );
  }
}



export default App;
