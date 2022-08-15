import {createSlice} from '@reduxjs/toolkit';
import {Images} from '@assets';
import {RootState} from '@store';

export interface Task {
  id: number;
  title: string;
  description: string;
  time: Date;
  state: number;
  Assigner: string;
  Assignee: string[];
  taskChild: string[];
  files: string[];
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

for (let i = 0; i <= 200; i++) {
  initialState.tasks.push({
    id: i,
    title: `Title ${i}`,
    description: `Description ${i}`,
    //img: Images.AuthWelcome.LOGO_CHAT,
    state: Math.floor(Math.random() * 4),
    Assignee: Array(Math.ceil(Math.random() * 10))
      .fill(1)
      .map(i => '00' + Math.ceil(Math.random() * 6)),
    Assigner: '00' + Math.ceil(Math.random() * 6),
    time: new Date(),
    taskChild: [],
    files: [],
  });
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    onAcc(state, acction) {
      state.tasks;
      const {id, ongoingState} = acction.payload;
      const a = state.tasks.find(task => task.id === id);

      a!.state = ongoingState;
    },
    createTask(stateTask, acction) {
      //stateTask.tasks;
      const {
        id,
        title,
        description,
        time,
        state,
        Assigner,
        Assignee,
        taskChild,
        files,
      } = acction.payload;
      stateTask.tasks.push({
        id: id,
        title: title,
        description: description,
        time: time,
        state: state,
        Assigner: Assigner,
        Assignee: Assignee,
        taskChild: taskChild,
        files: files,
      });
    },
  },
});

export const {onAcc, createTask} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const selectRole = (state, role, idUser) => (rootState: RootState) =>
  rootState.tasks.tasks.filter(
    t =>
      t.state === state &&
      ((role === 'Tôi giao' && t.Assigner === idUser) ||
        (role === 'Được giao' && t.Assignee.includes(idUser))),
  );
