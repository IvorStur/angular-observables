import { Component, OnInit, VERSION } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log('oninit');
    let obs1$;
    try {
      obs1$ = new Observable((subscriber) => {
        console.log('Inside Observable');
        try {
          throw new Error('Something went wrong');
        } catch (e) {
          console.log('caught');
          subscriber.error(' error caught: ' + e);
        }
        subscriber.next(new Date().getTime());
        subscriber.next(new Date().getTime());

        /*
      const interval = setInterval(() => {
        subscriber.next(4);
      }, 5000);
*/

        subscriber.complete();
        return function unsubscribe() {
          console.log('unsubscribe inter:');
          // clearInterval(interval);
        };
      });
    } catch (e) {
      console.log('caught');
    }

    try {
      const sub1: Subscription = obs1$.subscribe({
        next: (x: number) => {
          const a = 35;
          console.log('obs next: ' + (x + a));
        },
        error: (err: Error) => console.log('obs error: ' + err.message),
        complete: () => console.log('obs completed.'),
      });
    } catch (e) {
      console.log('caught');
    }

    console.log('calling unsubscribe outer');
    // setTimeout(() => sub1.unsubscribe(), 10000);
    // sub1.unsubscribe();

    console.log('Bezim dalej..');

    const sub2: Subscription = obs1$.subscribe({
      next: (x: number) => {
        const a = 35;
        console.log('obs next 2: ' + (x + a));
      },
    });

    const sub3: Subscription = obs1$.subscribe(
      (x: number) => {
        const a = 35;
        console.log('obs next 3: ' + (x + a));
      },
      (err: Error) => console.log('obs 3 error: ' + err.message),
      () => console.log('obs  3 completed.')
    );

    try {
      // hlupost
      throw new Error('Something went wrong');
    } catch (e) {
      // osetrenie
      console.log('Chyba: ' + e);
    }
  }
}
