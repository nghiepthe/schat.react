import {createSlice} from '@reduxjs/toolkit';
import {Images} from '@assets';

export interface Task {
  id: number;
  title: string;
  description: string;
  img: any;
  state: number;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

for (let i = 0; i <= 100; i++) {
  initialState.tasks.push({
    id: i,
    title: `Title ${i}`,
    description: `Description ${i}`,
    img: Images.AuthWelcome.LOGO_CHAT,
    state: Math.floor(Math.random() * 4),
  });
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
