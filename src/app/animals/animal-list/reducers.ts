import { Reducer, Action } from 'redux';

import { AnimalListComponent } from './component';

export class PayloadAction implements Action {
  type: string;
  payload?: any
}

export const colorReducer: Reducer<string> = (state = '', action: PayloadAction): string => {
  switch (action.type) {
    case AnimalListComponent.CHANGE_ANIMALS_COLOR:
      return action.payload;
  }
  return state;
};

export const animalListComponentReducer: Reducer<any> = (state: any = {}, action: Action): {} => ({
  ...state,
  animalsColor: colorReducer(state.animalsColor, action)
});
