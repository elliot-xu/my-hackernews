import { Injectable } from '@angular/core';
import { asapScheduler, asyncScheduler, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Injectable()
export class NewsCommentNofity {

  // Observable string sources
  private missionAnnouncedSource = new Subject<void>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource
  .asObservable()
  .pipe(observeOn(asyncScheduler));

  // Service message commands
  announceMission() {
    this.missionAnnouncedSource.next();
  }
}