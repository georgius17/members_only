var React = require('react');
var Layout = require('./layout');

function signUp(props) {

    let errorMessage = ''
    if (props.errors){
        errorMessage = props.errors.map(error => {
        return <h5 class="text-center mt-3">{error.msg}</h5>
    })
  }

    return (
      <Layout>
        <div class="container mt-5">
            <div class="row justify-content-md-center">
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <h1>Sign Up</h1>
                    <form method='POST' action='' >
                        <div class="form-group">
                            <label for="firstname">First name:</label>
                            <input type="text" class="form-control" id="firstname" placeholder="Enter username" name="firstname" required />
                        </div>

                        <div class="form-group">
                            <label for="lastname">Last name:</label>
                            <input type="text" class="form-control" id="lastname" placeholder="Enter username" name="lastname" required />
                        </div>

                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" required />
                        </div>

                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" required />
                            <small class="form-text text-mutted">Password must be at least 7 characters long</small>
                        </div>

                        <div class="form-group">
                            <label for="confirmpassword">Confirm Password:</label>
                            <input type="password" class="form-control" id="confirmpassword" placeholder="Enter password" name="confirmpassword" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {errorMessage}
        </div>

      </Layout>
    );
  }
  
  module.exports = signUp;