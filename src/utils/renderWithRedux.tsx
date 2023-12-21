import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { render } from "@testing-library/react";
import { persistor, store } from "@/store";

export function renderWithRedux(component: React.ReactNode) {
  return render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {component}
      </PersistGate>
    </Provider>,
  );
}
