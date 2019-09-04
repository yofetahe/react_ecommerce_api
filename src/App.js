import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ItemCatalog from "./components/ItemCatalog";
import ItemList from "./components/ItemList";
import CartContent from "./components/CartContent";
import SavedItemsList from "./components/SavedItemsList";
import CartPayment from "./components/CartPayment";
import AccountInformation from "./components/account/AccountInformation";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={ItemCatalog} />
            <Route exact path="/Items/:category_id" component={ItemList} />
            <Route
              exact
              path="/Items/:category_id/:type_id"
              component={ItemList}
            />
            <Route exact path="/cart" component={CartContent} />
            <Route
              exact
              path="/SavedItems/:user_id"
              component={SavedItemsList}
            />
            <Route exact path="/ProcessPayment" component={CartPayment} />
            <Route exact path="/MyAccount" component={AccountInformation} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}

export default App;
