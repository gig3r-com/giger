import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models/user';
import { users } from '../mocks/users';

export interface IUsersState {
    users: IUser[];
    currentUser?: IUser;
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify(users)),
    currentUser: undefined
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<IUser>) => {
            state.currentUser = action.payload;
        }
    }
});

export const { setUsers, setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
