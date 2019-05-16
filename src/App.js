import React from 'react';
import logo from './logo.svg';
import './App.css';
import { homedir } from 'os';

function App() {
  return (
    <Main />
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
  contact = Contact()
  works = Works()
  blog = <Blog />

  render(){
    return(
      <div>
        <MenuButton text="Home" link={this.home} onChange={this.handleMainpageChange} />
        <MenuButton text="Profile" link={this.profile} onChange={this.handleMainpageChange} />
        <MenuButton text="Contact" link={this.contact} onChange={this.handleMainpageChange} />
        <MenuButton text="Works" link={this.works} onChange={this.handleMainpageChange} />
        <MenuButton text="Blog" link={this.blog} onChange={this.handleMainpageChange} />
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
      <h1>Home</h1>
      <a>welcome to my new website!</a><br />
      <a>上のボタンを押したら、検証からどこが変化しているのか確認できるよ！</a>
    </div>
  );
}
function Profile(){
  return(
    <div>
      <h1>Profile</h1>
      <a>name: Mikazuki_Laisa</a>
    </div>
  );
}
function Contact(){
  return(
    <div>
      <h1>Contact</h1>
      <a>mail: </a>
    </div>
  );
}
function Works(){
  return(
    <div>
      <h1>Works</h1>
    </div>
  );
}
class Blog extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubpageChange = this.handleSubpageChange.bind(this);
    this.state = {subpage: "subpage"}
  }

  handleSubpageChange(subpage) {
    this.setState({subpage});
  }

  home = Home()
  profile = Profile()
  contact = Contact()
  works = Works()
  blog = <Blog />

  render(){
    return(
      <div>
        <h1>Blog</h1>
        <div class="Blog-display">
          <div>
            {this.state.subpage}
          </div>
          <div>
            <ul>
              <li><MenuButton text="Profile" link={this.profile} onChange={this.handleSubpageChange} /></li>
              <li><MenuButton text="Blog" link={this.blog} onChange={this.handleSubpageChange} /></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onChange(this.props.link);
    e.preventDefault();
  }

  render() {
    return (
       <input type="button" class="btn-square-pop" value={this.props.text} onClick={this.handleClick}/>
    );
  }
}



export default App;
