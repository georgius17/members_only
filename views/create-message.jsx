var React = require('react');
var Layout = require('./layout');

function createMessage(props) {

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
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <h1>Create message</h1>
                    <form method='POST' action=''> 
                        <div class="form-group">
                            <label for="title">Username:</label>
                            <input type="text" class="form-control" id="title" placeholder="Title" name="title" required />
                        </div>

                        <div class="form-group">
                            <label for="message">Password:</label>
                            <textarea class="form-control" id="message" rows="3" placeholder="Enter your message" name="message" required />
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
  
  module.exports = createMessage;