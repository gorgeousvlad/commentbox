import React from "react";
export class Comments extends React.Component{
  constructor(props){
    super(props);
    this.state = {...props}
  }
  // componentDidMount(){
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("GET",this.props.url,true);
  //   xhr.timeout = 5000;
  //   xhr.onreadystatechange = () => {
  //     console.log(xhr)
  //     if (xhr.readyState != 4) return;
  //     if (xhr.status != 200){
  //       console.error(xhr.status,xhr.statusText)
  //     }
  //     else{
  //       console.log(xhr.getAllResponseHeaders());
  //       this.setState(xhr.responseText);
  //     }
  //   }.bind(this)
  //   xhr.send(commentInfo);
  // }
  postInfo(commentInfo){
    var xhr = new XMLHttpRequest();
    xhr.open("POST",this.props.url,true);
    xhr.timeout = 5000;
    xhr.onreadystatechange = (() => {
      console.log(xhr)
      if (xhr.readyState != 4) return;
      if (xhr.status != 200){
        console.error(xhr.status,xhr.statusText)
      }
      else{
        console.log(xhr.getAllResponseHeaders());
        this.setState(xhr.responseText);
      }
    }).bind(this)
    xhr.send(commentInfo);
  }
  render(){
    return(
      <div className = 'comments-container'>
        <CommentList data = {this.state.data}/>
        <CommentBox 
          {...Object.assign({},this.state.curUser,{onSubmit: this.postInfo.bind(this)})}
        />
      </div>

      )
  }
}
class CommentBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {value:""};
    this._onChange = this._onChange.bind(this);
  }
  _onChange(ev){
    this.setState({value:ev.target.value});
  }
  _onSubmit(ev){
      console.log("SUBMT")
      ev.preventDefault();
      this.props.onSubmit(Object.assign({}, this.props, {text: this.state.value}))
      this.setState({value:""});
  }
  _onClickClear(ev){
    this.setState({value:""});
  }
  render() {
    return (
    <div className = "container">
      <CommentLabel {...this.props}/>
      <form className = 'form-horizontal text-right' role = 'form' onSubmit = {this._onSubmit.bind(this)}>
        <div className = 'form-group'>
          <div className="col-md-6 col-sm-6">
            <textarea className = 'form-control' cols = "3" rows = "6" id = 'inp' onChange = {this._onChange.bind(this)} value = {this.state.value}></textarea>
            <button type = 'submit' disabled = 'disabled' className = 'btn btn-success btn-sm'>Post</button>
            <button type = 'button' className = 'btn btn-danger btn-sm' onClick = {this._onClickClear.bind(this)}>Clear</button>
          </div>
        </div>
      </form>
    </div>
    );
  }
};
var CommentLabel = (props) =>{
  return (
      <div className = "label-outer">
        <img className = "avatar" src = {props.avatar} />
        <div className = 'user-label'>{props.author}</div>
      </div>
  );
};
var Comment = (props) => {
    return(
        <div className = "comment-outer">
          <CommentLabel avatar = {props.avatar} author = {props.author}/>
          <div className = "comment">{props.children}</div>
        </div>
    );
};

class CommentList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let comments = this.props.data.map((record, index) => {
      return (
      <Comment key = {index} avatar = {record.avatar} author = {record.author}>
        {record.text}
      </Comment>
      );
    })
    return (
        <div className = "comment-list">
          <div>{this.props.header}</div>
            {comments}
        </div>
    );
  };
}