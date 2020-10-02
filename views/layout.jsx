const React = require('react');

function Layout(props) {

  const loginSwitcher = () => {
    if (props.user !== undefined){
      return (
        <ul>
          <li><a href="/">Home</a></li>
          <li class="float-right" ><a href="/log-out">Log out</a></li>
          <li class="float-right" ><a href="/create-message">Create message</a></li>
          <li class="float-right" > {props.user.membership == false ? <a href="/become-member">Become a member</a> : props.user.membership && !props.user.admin ? <a href="/become-admin">Become an admin</a> : '' } </li>
          <li class="float-right user" ><strong>{props.user.username}</strong></li>
        </ul>
      )
    } else {
      return (
        <ul>
            <li><a href="/">Home</a></li>
            <li class="float-right" ><a href="/sign-in">Sign in</a></li>
            <li class="float-right"><a href="/sign-up">Sign up</a></li>
        </ul>
      )
    }
  
  } 

  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
        </head>
      <header>
        {loginSwitcher()}
          {/* <ul>
            <li><a href="/">Home</a></li>
            <li class="float-right" ><a href="/sign-in">Sign in</a></li>
            <li class="float-right"><a href="/sign-up">Sign up</a></li>
          </ul> */}
      </header>
      <body>
          <div class="container mt-5">

          </div>
          {props.children}
      </body>

    </html>
  );
}

module.exports = Layout;