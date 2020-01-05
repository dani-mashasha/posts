import React from "react";
import Comment from "../comment/comment";
import MyForm from "../my_form/my_form";
import EditPost from "../edit_form/edit_form";


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isoOen: false,
            isShown: false,
            isEdit:false,
            title:this.props.title,
            body:this.props.body
        }
    }

    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.id}`, {
                method: 'GET',
            }
        ).then(response => response.json()
        ).then(success => {
                this.setState({
                    comments: success,
                })
            }
        ).catch(error => console.log(error))
    };

    handleComments = (e) => {
        e.preventDefault();
        this.state.isShown &&
        this.setState({
                isOpen: !this.state.isOpen
            }
        )
    }
    handlePost = (e) => {
        e.preventDefault();
        this.state.isOpen && this.state.isShown ?
            this.setState({
                    isShown: !this.state.isShown,
                    isOpen: !this.state.isOpen

                }
            ) : this.setState({
                isShown: !this.state.isShown,
            })
    }

    handleFormComment = (data) => {
        data.postId = this.props.id;
        fetch("https://jsonplaceholder.typicode.com/comments", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(response => response.json()
        ).then(success => {
                this.state.comments.unshift(success);
                console.log(this.state.comments);
                this.setState({
                    comments: this.state.comments,
                    loading: false
                })
            }
        ).catch(error => console.log(error))


    }

    handleEdit =(e)=>{
        this.setState({
                isEdit: !this.state.isEdit
            }
        )
    }

    handleEditPost =(data)=>{
        console.log(data);
        fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.props.id}`, {
                method: 'PUT',
                body:JSON.stringify(data.body),
                title:JSON.stringify(data.title),

            }
        ).then(response => response.json()
        ).then(success => {
            this.setState({
                title: data.title,
                body: data.body,
                isEdit:!this.state.isEdit

            })
            }
        ).catch(error => console.log(error))
    };



    render() {

        const {comments, isOpen, isShown,isEdit,title, body} = this.state;

        return (
            <div className={"post"}>

                {!isEdit &&
                <a href="/" onClick={this.handlePost}>
                        <h5>{title}</h5>
                    </a>
                }

                {isShown && !isEdit &&
                <div>
                    <p>{body}</p>
                    <button onClick={this.handleEdit}>Edit post</button>

                </div>
                }

                {isEdit &&
                    <EditPost title={title} body={body} handleForm={this.handleEditPost}/>
                }

                <div className={"commentLink"}>
                    <a href="/" onClick={this.handleComments}
                       style={isShown ? {color: "red"} : {color: "black"}}>{comments.length} comments</a>
                </div>

                {isOpen &&
                <div>
                    <MyForm name={"Comment"} handleForm={this.handleFormComment} myClass={"addComment"}/>
                    {comments.map((comment, i) => <Comment {...comment} key={i}/>)}

                </div>
                }


            </div>


        )
    }
}

export default Post;