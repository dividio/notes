import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/note';

@Pipe({
  name: 'notesfilter', 
  pure: false
})
/** Search notes by title and content.*/
export class NotesFilterPipe implements PipeTransform {
  transform(items: Note[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items arrayby filter
    return items.filter(item => 
      (item.title.toUpperCase().indexOf(filter.toUpperCase()) !== -1 
      || item.content.toUpperCase().indexOf(filter.toUpperCase()) !== -1));
  }
}
