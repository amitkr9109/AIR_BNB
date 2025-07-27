import { useSelector } from "react-redux";
import { CurrentUserService ,SignUpService, LoginService, LogOutService } from "../../API/UserService";
import { login, logout } from "../UserSlice";

export const asynCurrentUser = (user) => async (dispatch) => {
    const response = await CurrentUserService(user);
    dispatch(login(response));
    return response;
};

export const asyncSignUp = (user) => async(dispatch) => {
    const response = await SignUpService(user);
    dispatch(asynCurrentUser(response));
    return response;
};

export const asyncLogin = (user) => async(dispatch) => {
    const response = await LoginService(user);
    dispatch(login(response));
    return response;
};

export const asynLogout = (user) => async(dispatch) => {
    const response = await LogOutService(user);
    dispatch(logout(response));
    return response;
};