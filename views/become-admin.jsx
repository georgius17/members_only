var React = require('react');
var Layout = require('./layout');

function becomeAdmin(props) {

    let errorMessage = ''
    if (props.errors){
        errorMessage = props.errors.map(error => {
        return <h5 class="text-center mt-3">{error.msg}</h5>
    })
  }

    return (
      <Layout user={props.user}>
        <div class="container mt-5">
            <div class="row justify-content-md-center">
                <div class="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-6 mt-5 p-4 transparent rounded">
                    <h1>Become an admin</h1>
                    <p class="text-center font-italic">You have to answer correctly to become an admin and be able to see who wrote posts and delete them.</p>
                    <form class="d-flex flex-column align-items-center" method='POST' action=''> 
                        <div class="form-group">
                            <label for="answer"> What is the Johns favorite activity? </label>
                            <input type="text" class="form-control" id="answer" name="answer" required />
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
  
  module.exports = becomeAdmin;