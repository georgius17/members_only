const React = require('react');
const Layout = require('./layout');
const Message = require('./message');

function index(props) {

  
  let messages = props.messages.map(message => {
    return ( <Message user={props.user} id={message._id} author={message.user} title={message.title} text={message.text} time={message.formattedDate} /> )
  })

    return (
      <Layout user={props.user} >
        <div class="row justify-content-center m-0">
          {props.user !== undefined ? <div class="col-sm-12 col-md-6 col-lg-6" ><h2>Welcome back {props.user.username}</h2></div>  : ''}
          {messages}

        </div>
      </Layout>
    );
  }
  
  module.exports = index;