import { Component, Input } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    constructor(private messageService: MessageService) {

    }
    
    @Input() message: Message;

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.messageService.deleteMessage(this.message).subscribe(
            data => {console.log("Message deleted Successfully " + JSON.stringify(data))},
            error => console.log(error)
        );
    }
}