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
        <LoadPage text="Home" link={this.home} onChange={this.handleMainpageChange} />
        <LoadPage text="Profile" link={this.profile} onChange={this.handleMainpageChange} />
        <LoadPage text="Contact" link={this.contact} onChange={this.handleMainpageChange} />
        <LoadPage text="Works" link={this.works} onChange={this.handleMainpageChange} />
        <LoadPage text="Blog" link={this.blog} onChange={this.handleMainpageChange} />
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

  blog1 = BlogContents()

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
              <li><LoadPage text="Hello my blog!" link={this.blog1} onChange={this.handleSubpageChange} /></li>
              <li><LoadPage text="react is very fun!" link={this.blog2} onChange={this.handleSubpageChange} /></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function BlogContents(){
  const text = "# hello world"
  const text2 = loadFile("https://laisa.info/api/blog01.txt")
  return(
    <div>
      {remark().use(reactRenderer).processSync(text2).contents}
    </div>
  )
}
function loadFile(fileName){
  const httpObj = new XMLHttpRequest();
  httpObj.open('GET',fileName+"?"+(new Date()).getTime(),true);
  // ?以降はキャッシュされたファイルではなく、毎回読み込むためのもの
  httpObj.send(null);
  const text = httpObj.responseText
  return(text);  
}

class LoadPage extends React.Component {
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
