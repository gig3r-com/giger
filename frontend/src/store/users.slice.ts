import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models/user';
import { users } from '../mocks/users';

export interface IUsersState {
    users: IUser[];
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify(users))
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
    }
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
