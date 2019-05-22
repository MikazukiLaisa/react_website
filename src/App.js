import React from 'react';
import logo from './logo.svg';
import './App.css';
import { homedir } from 'os';
import remark from 'remark'
import reactRenderer from 'remark-react'
import home01 from "./resources/home01.png"
import react from "./resources/react.png"
import github from "./resources/github.png"
import twitter from "./resources/twitter.png"
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';
import { newExpression } from '@babel/types';


function App() {
  return (
    <Main />
  );
}

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.handleMainpageChange = this.handleMainpageChange.bind(this);
    this.state = {mainpage: Home(), text: "# Hello world"}
    
  }

  handleMainpageChange(mainpage) {
    this.setState({mainpage});
  }

  home = Home()
  profile = Profile()
  contact = Contact()
  works = Works()
  blog = <Blog />
  link = Link();


  render(){
    return(
      <div>
      <div class="menubar">
        <p class="menubar-name">Mikazuki_Laisa</p>
        <LoadPageButton text="Home" mainContents={this.home} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Profile" mainContents={this.profile} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Contact" mainContents={this.contact} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Works" mainContents={this.works} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Blog" mainContents={this.blog} onChange={this.handleMainpageChange} />
        <LoadPageButton text="Links" mainContents={this.link} onChange={this.handleMainpageChange} />
        <div class="menubar-sns">
          <Button css="menubar-sns-button" link="https://twitter.com/?lang=ja" img={twitter}/>
          <Button css="menubar-sns-button" link="https://github.com/MikazukiLaisa" img={github} />
        </div>
        </div>
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
      <hr />
      <img src={home01} alt="mican" class="center" />
      <hr />
      <div class="box-container">
        <Button css="on-picture" link="https://github.com/MikazukiLaisa" img={github} text="Githubが更新されました"/>
        <Button css="on-picture" link="https://reactjs.org/" img={react} text="Reactは健康にいい"/>
        <Button css="on-picture" link="https://twitter.com/?lang=ja" img={twitter} text="Twitterが更新されました"/>
      </div>
    </div>
  )
}



function Profile(){
  return(
    <div>
      <h1>Profile</h1>
      <p>Mikazuki Laisa</p>
      <p>お絵かきとプログラミングやってます。</p>
      <p>React, nginx, unity</p>
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
function Link(){
  return(
    <div>
        <ul>
        <li>
          <a href="https://twitter.com/Mikazuki_Laisa" target="_blank">Twitter</a>
        </li>
        <li>
          <a href="https://www.pixiv.net/member.php?id=8383999" target="_blank">Pixiv</a>
        </li>
        <li>
          <a href="https://qiita.com/Mikazuki_Laisa" target="_blank">Qiita</a>
        </li>
        <li>
          <a href="https://github.com/MikazukiLaisa" target="_blank">github</a>
        </li>
        <li>
          <a href="http://b.hatena.ne.jp/Mikazuki_Laisa/bookmark" target="_blank">bookmark</a>
        </li>
        <li>
            <a href="https://jp.finalfantasyxiv.com/lodestone/character/23125854/" target="_blank">ff14</a>
        </li>
        <li>
          <a href="https://pubg.op.gg/user/LaisaMican" target="_blank">pubg</a>
      </li>
      </ul>
    </div>
  )
}

class Blog extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubpageChange = this.handleSubpageChange.bind(this);
    this.state = {subpage: "subpage"}
  }

  handleSubpageChange(subpage) {
    console.log("handle subpage change")
    this.setState({subpage});
  }

  render(){
    console.log("hey")
    console.log(this.state.subpage)
    return(
      <div>
        <h1>Blog</h1>
        <div class="Blog-display">
          <div>
            {this.state.subpage}
          </div>
          <div>
            <ul class="blogselect">
              <li><LoadBlogButton text="Hello my blog!" blog="portforward -r.txt" onChange={this.handleSubpageChange} /></li>
              <li><LoadBlogButton text="react is very fun!" blog="webcam openclose.txt" onChange={this.handleSubpageChange} /></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function ConvertBlog(text){
      return(
        <div>
          {remark().use(reactRenderer).processSync(text).contents}
        </div>
    )
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
      <div>
        <button class="menubar-button" value={this.props.text} onClick={this.handleClick}>
         <p>{this.props.text}</p>
        </button>
      </div>

    );
  }
}

class LoadBlogButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {subContents: ""}
  }
  

  //Buttonを押すと、サーバーからブログ内容が読み込まれる。
  async handleClick(e) {
      //laisa/server.jsをnodejsで動かしてからアクセス
      const baseurl = "https://laisa.info/api/blog";
      const blog = encodeURIComponent(this.props.blog);
      const url = baseurl+"?blog="+blog;
      fetch(url, {
        mode: 'cors'
      })
      .then((response) => {
           return response.text();
      })
      .then((text) => {
        return ConvertBlog(text)
      })
      .then((convertedText) => {
          this.setState({subContents: convertedText});
          this.props.onChange(this.state.subContents);
      });
      e.preventDefault();
  }

  render() {
    return (
      <div>
        <input type="button" class="btn-square-pop" value={this.props.text} onClick={this.handleClick} />
      </div>
    );
  }
}

class News extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div class="on-picture">
        <a href={this.props.link}>
         <img src={this.props.img} alt="mican" />
         <p>{this.props.text}</p>
         </a>
       </div>
    )
  }
}

class Button extends React.Component{
  render(){
    return(
      <div class={this.props.css}>
      <a href={this.props.link}>
      <img src={this.props.img} alt={this.props.alt}/>
      <p>{this.props.text}</p>
      </a>
    </div>
    )
  }
}



export default App;
