import React from "react";

class EditPost extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange =(e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value

        })
        console.log(this.state)

    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const data = this.state;
        this.props.handleForm(data);

    }
    render() {
        const {title,body}= this.props;
        return(
        <div className={"editPost"}>
                <h3>Edit Post</h3>
                <div>
                    <textarea name="title" id="" cols="70" rows="2"  defaultValue={title} onChange={this.handleChange}></textarea>
                </div>
                <div>
                    <textarea name="body" id="" cols="70" rows="10" defaultValue={body} onChange={this.handleChange}></textarea>
                </div>
                <button onClick={this.handleSubmit}>Save Post</button>
            </div>

        )
    }
}

export default EditPost;