import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/service/api.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // Actions
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  dateTest: any = new Date().toISOString().split('Z')[0];


  // Events
  events: any[] = [
    {

    //  start: new Date(),
    //  end: new Date(),
      _id : '',
      account_id: JSON.parse(localStorage.getItem('account'))._id,
      start: moment(subDays((new Date()), 1)).seconds(0).milliseconds(0),
      stringStart:  moment(subDays((new Date()), 1)).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      end: moment(addDays(endOfDay(new Date()), 1)).seconds(0).milliseconds(0),
      stringEnd:  moment(addDays(endOfDay(new Date()), 1)).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      title: 'A 3 day event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];
  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private apiService: ApiService) {}
  ngOnInit(): void {
  }
/* On Day Click*/
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

/** Time change */

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        iEvent.stringStart =  moment((newStart) ).seconds(0).milliseconds(0).toISOString().split('Z')[0];
        iEvent.stringEnd =  moment((newEnd)).seconds(0).milliseconds(0).toISOString().split('Z')[0];
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);

  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    const newEvent: any = {
      account_id: JSON.parse(localStorage.getItem('account'))._id,
      title: 'New event',
      start: moment((new Date())).seconds(0).milliseconds(0),
      stringStart: moment((new Date())).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      end: moment((new Date())).seconds(0).milliseconds(0),
      stringEnd: moment((new Date())).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
    this.events = [
      ...this.events,
      newEvent,
    ];
    this.apiService.apiPost('event', newEvent ).subscribe((reponse: any) => {
      console.log(reponse);
      newEvent._id = reponse._id ;
    });
  }

  deleteEvent(eventToDelete: any) {
    console.log(eventToDelete);

    this.apiService.apiDelete(`event/${eventToDelete._id}`).subscribe(reponse => {
      console.log(reponse);
    });
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  myLogger(event: any) {
    console.log(event);
  }

  dateChanged(event: any) {
    event.start = new Date(event.stringStart);
    event.end = new Date(event.stringEnd);


    this.refresh.next();
    console.log('haw levent', event);

  }

}
