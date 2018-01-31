import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "./message.service";
import { NgForm } from "@angular/forms";
import { Message } from "./message.model";

@Component({
    selector: "app-message-input",
    templateUrl: "./message-input.component.html"
})
export class MessageInputComponent implements OnInit{
    
    message: Message;

    constructor(
        private messageService: MessageService) {
    }

    ngOnInit() {
        let self = this;
        this.messageService.messageIsEdited.subscribe(
            (message:Message) => {
                self.message = message;
            }
        );
    }
    
    onSubmit(form: NgForm) {
        if(!this.message) {
            let message = new Message(form.value.content, 'Amjad');
            this.messageService.addMessage(message).subscribe(
                data => {
                    this.message = null;                   
                    form.resetForm()
                },
                error => console.error(error)
            );
        } else {
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message).subscribe(
                data => {
                    this.message = null;                   
                    form.resetForm()
                },
                error => console.error(error)
            );
        }
    }

    onCancel(form: NgForm) {
        this.message = null;
        form.resetForm();
    }
}