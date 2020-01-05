import React from "react";
import Post from "../post/post";
import "./feed.css";
import MyForm from "../my_form/my_form";

class FeedPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedPosts: [],
            loading: true,
            isNewPost: false
        };
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'GET',
            }
        ).then(response => response.json()
        ).then(success => {
                this.setState({
                    feedPosts: success,
                    loading: false
                })
            }
        ).catch(error => console.log(error))
    };
    handleNewPost = (e) => {
        e.preventDefault()
        this.setState({
            isNewPost: !this.state.isNewPost
        })
    }

    handleFormPost = (data) => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(response => response.json()
        ).then(success => {
                this.setState({
                    feedPosts: [success].concat(this.state.feedPosts),
                    loading: false
                })
            }
        ).catch(error => console.log(error))


    }


    render() {
        const {feedPosts, loading, isNewPost} = this.state;
        return (
            <div>
                <h1>Posts</h1>
                <button onClick={this.handleNewPost}>Add new post</button>
                {isNewPost &&
                <MyForm name={"Post"} handleForm={this.handleFormPost} myClass={"addPost"}/>
                }
                {loading ? <p>Loading...</p> : feedPosts.map((post, i) => <Post {...post} key={i}/>)}
            </div>
        )
    }
}


export default FeedPosts;