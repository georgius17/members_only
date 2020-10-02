var React = require('react');
var Layout = require('./layout');

function signIn(props) {

    return (
      <Layout>
          
        <div class="container mt-5">
            <div class="row justify-content-md-center">
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <h1>Sign in</h1>
                    <form method='POST' action=''> 
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" required />
                        </div>

                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

      </Layout>
    );
  }
  
  module.exports = signIn;