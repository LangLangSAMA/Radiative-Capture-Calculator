import React from "react";

// import components
import Header from "./Header";
import Content from "./Content";

// import css
import "./App.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="component-app">
                <Header />
                <Content />
            </div>
        );
    }
}
export default App;