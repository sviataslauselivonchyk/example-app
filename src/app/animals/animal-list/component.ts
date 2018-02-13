import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { dispatch, PathSelector, WithSubStore } from '@angular-redux/store';

import { IAnimal } from '../model';
import { animalListComponentReducer } from './reducers';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: animalListComponentReducer,
})
@Component({
  selector: 'zoo-animal-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent {
  static readonly CHANGE_ANIMALS_COLOR = 'CHANGE_ANIMALS_COLOR';

  @Input() animalsName: string;
  @Input() animalType: string;
  @Input() animalsColor: Observable<string>;
  @Input() animals: Observable<IAnimal[]>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;

  getBasePath(): PathSelector {
    return [this.animalType];
  }

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_: any, animal: IAnimal) {
    return animal.id;
  }

  @dispatch() changeAnimalsColor = (value: string) => ({type: AnimalListComponent.CHANGE_ANIMALS_COLOR, payload: value});
}
