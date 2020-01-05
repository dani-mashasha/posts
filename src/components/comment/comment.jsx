import React from "react";

class Comment extends React.Component{
    constructor(props){
        super(props);

    }
    render() {
        const {name,email,body} = this.props;
        return(
            <div className={"comment"}>
                <h5>{name}</h5>
                <p>{body}</p>
                <span>{email}</span>
            </div>
        )
    }

}

export default Comment;