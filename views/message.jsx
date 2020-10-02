const React = require('react');

function message(props){

    let deleteBut = '';
    if (props.user !== undefined){
        if (props.user.admin === true){
            deleteBut = <button class="deleteButton"><a href={"/message/"+props.id+"/delete"}>X</a></button>
    
        }
    }

    let author = <p class="float-right font-italic text-secondary"> Unknown </p>;
    if (props.user !== undefined) {
        if (props.user.membership || props.user.admin) {
            author = <p class="float-right font-italic text-secondary"> Posted by {props.author.username}, {props.time} </p>
        }
    }

    return (
        <div class="message col-sm-12 col-md-6 col-lg-6 align-self-center">
            <h5 class="text-center font-weight-bold">{props.title}</h5>
            {deleteBut}
            
            <p class="text-center">{props.text}</p>
            <div class="mt-3">
                {author}
            </div>
            
        </div>
        
    );
}

module.exports = message;

