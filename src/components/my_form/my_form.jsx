import React from "react";


class MyForm extends React.Component{
    constructor(props){
        super(props);


    }
    handleChange =(e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state){
            const {name,email,body} = this.state;

            const data = this.state;

            this.props.handleForm(data);
        }
    }


    render() {
        const {name,myClass} = this.props;
        let inputName;
        return(
            <div className={`formWrapper ${myClass}`}>
                <form onSubmit={this.handleSubmit}>
                    <h3>write new {name}</h3>

                    {myClass === "addComment"? inputName = "name": inputName = "title"}
                            <label>Title</label>
                                <div>
                                    <input type="text" name={inputName} placeholder={"Your name..."} onChange={this.handleChange}/>
                                </div>

                            <label>Title</label>
                                <div>
                                    <input type="text" name={"email"} placeholder={"Your email..."} onChange={this.handleChange}/>
                                </div>

                    <label>{name}</label>
                    <div>
                        <textarea name={"body"} placeholder={`Your ${name}...`} cols={"50" } rows={"10"} onChange={this.handleChange}/>
                    </div>

                    <input type="submit"/>

                </form>
            </div>
        )
    }
}

export default MyForm;