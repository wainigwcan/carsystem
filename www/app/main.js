import React from "react";
import dva from "dva";
import roter from "./router.js";
import { createLogger } from 'redux-logger';

import carshowModel from "./models/carshowModel";
import carpickerModel from "./models/carpickerModel";

const app = dva({
    onAction: createLogger()
});

//注册model
app.model(carshowModel);
app.model(carpickerModel);

//路由
app.router(roter);

app.start("#app-container");