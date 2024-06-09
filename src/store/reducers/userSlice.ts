import {userDTO} from "../../api/dto/user.dto";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Roles} from "../../api/dto/auth.dto";

const initialState: userDTO = {
    id: "",
    date_birthday: new Date(),
    date_reg: new Date(),
    email: "",
    firstname: "",
    lastname: "",
    role: Roles.default
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<userDTO>) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.date_reg = action.payload.date_reg
            state.date_birthday = action.payload.date_birthday
            state.role = action.payload.role
            // state = action.payload
        },
        deleteUser(state) {
            state.date_birthday = new Date()
            state.date_reg = new Date()
            state.email = ""
            state.firstname = ""
            state.lastname = ""
            state.role = Roles.default
            state.id = ""
            // state = initialState
        }
    }
})
export const {addUser, deleteUser} = userSlice.actions
export default userSlice.reducer