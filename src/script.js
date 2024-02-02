import {Router} from "./control/Router.js";

const router = new Router();

let path = window.location.pathname;
router.showRoute(path)