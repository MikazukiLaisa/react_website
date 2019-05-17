import React from 'react';
import logo from './logo.svg';
import './App.css';
import { homedir } from 'os';
import remark from 'remark'
import reactRenderer from 'remark-react'


function App() {
  return (
    <Main />
  );
}

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.handleMainpageChange = this.handleMainpageChange.bind(this);
    this.state = {mainpage: "hoge", text: "# Hello world"}
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
        <LoadPageButton text="Home" mainContents={this.home} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Profile" mainContents={this.profile} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Contact" mainContents={this.contact} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Works" mainContents={this.works} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Blog" mainContents={this.blog} onChange={this.handleMainpageChange} />
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

  //ここでクラスで呼ぶと、１つしか生成されない
  // blog1 = BlogContents("this is blog#1");
  // blog2 = BlogContents("this is blog#2");

  blog1 = <div>wakaran</div>
  
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
              <li><LoadBlogButton text="Hello my blog!" subContents={this.blog1} url="http://localhost:3020/api" onChange={this.handleSubpageChange} /></li>
              <li><LoadBlogButton text="react is very fun!" subContents={this.blog2} onChange={this.handleSubpageChange} /></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

//関数じゃないとだめ
function BlogContents(text2){
  text2 = fetch("http://localhost:3020/api", {
    mode: 'cors'
  })
    .then((response) => {
      return response.statusText;
    })
    .then((text) => {
      return(
        <div>
          {text}
          {remark().use(reactRenderer).processSync(text).contents}
        </div>
    )
  })
}





class LoadPageButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onChange(this.props.mainContents);
    e.preventDefault();
  }

  render() {
    return (
       <input type="button" class="btn-square-pop" value={this.props.text} onClick={this.handleClick}/>
    );
  }
}

class LoadBlogButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {subContents: ""}
  }
  

  handleClick(e) {
    fetch("http://localhost:3020/api", {
      mode: 'cors'
    })
      .then((response) => {
          return response.text();
      })
      .then((mytext) => {
          this.setState({subContents: mytext});
      });
      this.props.onChange(this.props.subContents);
      e.preventDefault();
  }

  render() {
    return (
      <div>
        <input type="button" class="btn-square-pop" value={this.props.text} onClick={this.handleClick}/>
        {this.state.subContents}
      </div>
    );
  }
}



export default App;
