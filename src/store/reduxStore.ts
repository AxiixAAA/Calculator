import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import dialogsReducer from "./reducers/dialogsReducer";
import friendsReducer from "./reducers/friendsReducer";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";
import newsReducer from "./reducers/newsReducer";
import userProfileReducer from "./reducers/userProfileReducer";
import authReducer from "./reducers/authReducer";
import appReducer from "./reducers/appReducer";
import chatReducer from "./reducers/chatReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsSection: friendsReducer,
    newsPage: newsReducer,
    usersPage: usersReducer,
    userProfilePage: userProfileReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
})

//@ts-ignore
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhacer(applyMiddleware(thunk)));
//@ts-ignore
window.store = store;

export default store;


export type TGlobalState = ReturnType<typeof reducers>
export type TReturnActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
// немножко магии; создаем тип из любого объекта Т, в котором ключ - строка,
// а значение - функция с any-аргументами, и с некоторым телом U