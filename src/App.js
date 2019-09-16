import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemCatalog from "./components/items/ItemCatalog";
import ItemList from "./components/items/ItemList";
import CartContent from "./components/cart/CartContent";
import SavedItemsList from "./components/account/SavedItemsList";
import CartPayment from "./components/cart/CartPayment";
import AccountInformation from "./components/account/AccountInformation";

import history from "./util/history";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Header />
        <div className="ui container" style={{ minHeight: "800px" }}>
          <Switch>
            <Route exact path="/" component={ItemCatalog} />
            <Route exact path="/Items/:category_id" component={ItemList} />
            <Route
              exact
              path="/Items/:category_id/:type_id"
              component={ItemList}
            />
            <Route exact path="/cart" component={CartContent} />
            <Route exact path="/SavedItems" component={SavedItemsList} />
            <Route exact path="/ProcessPayment" component={CartPayment} />
            <Route exact path="/MyAccount" component={AccountInformation} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
