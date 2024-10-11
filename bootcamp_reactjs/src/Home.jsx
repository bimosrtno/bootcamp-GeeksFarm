import React from "react";
import { Provider } from "react-redux";
import Store from "./Store";
import Counter from "./Counter";
const Home = () => {
    return( <div>INI HOME YAAAAAA
  
<Provider store={Store}>
      <Counter />
    </Provider>
</div>
    )
};

export default Home; // Ekspor default
