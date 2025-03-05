import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Ahora cada mensaje es un objeto { username, message }
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Añadir el mensaje y el nombre del usuario
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;