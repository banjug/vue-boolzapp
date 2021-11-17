var app = new Vue({
    el: '#app',
    data: {
        // dati utente 
        user: {
            userName: 'Carlo Carli',
            avatar: 'img/avatar_io.jpg',
            visible: true,
        },
        // dati contatti 
        contacts: [
            {
                userName: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                search: true,
                messages: [
                    {   
                        date: '10/01/2020 15:30:55',   
                        text: 'Hai portato a spasso il cane?',   
                        status: 'sent'   
                    },   
                    {   
                        date: '10/01/2020 15:50:00',   
                        text: 'Ricordati di dargli da mangiare',   
                        status: 'sent'   
                    },   
                    {   
                        date: '10/01/2020 16:15:22',   
                        text: 'Tutto fatto!',   
                        status: 'received'   
                    }  
                ]
            },
            {   
                userName: 'Fabio',   
                avatar: 'img/avatar_2.jpg',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '20/03/2020 16:30:00',   
                        text: 'Ciao come stai?',   
                        status: 'sent'   
                    },   
                    {   
                        date: '20/03/2020 16:30:55',   
                        text: 'Bene grazie! Stasera ci vediamo?',   
                        status: 'received'   
                    },   
                    {   
                        date: '20/03/2020 16:35:00',   
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',   
                        status: 'sent'   
                    }   
                ],   
            },  
            {   
                userName: 'Samuele',   
                avatar: 'img/avatar_3.jpg',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '28/03/2020 10:10:40',   
                        text: 'La Marianna va in campagna',   
                        status: 'received'   
                    },   
                    {   
                        date: '28/03/2020 10:20:10',   
                        text: 'Sicuro di non aver sbagliato chat?',   
                        status: 'sent'   
                    },   
                    {   
                        date: '28/03/2020 16:15:22',   
                        text: 'Ah scusa!',   
                        status: 'received'    
                    }   
                ],   
            },   
            {   
                userName: 'Luisa',   
                avatar: 'img/avatar_4.jpg',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '10/01/2020 15:30:55',   
                        text: 'Lo sai che ha aperto una nuova pizzeria?',   
                        status: 'sent'   
                    },   
                    {   
                        date: '10/01/2020 15:50:00',   
                        text: 'Si, ma preferirei andare al cinema',   
                        status: 'received'   
                    } 
                ],   
            }, 
        ],
        // valore del messaggio inviato
        newMessage: {
            date: new Date().toLocaleString(),
            text: '',
            status: 'sent'
        },
        // messaggio di risposta automatico 
        responseMessage: {
            date: new Date().toLocaleString(),
            text: 'Ok!',
            status: 'received'
        },
        // valore del box ricerca 
        chatSearch: '',
        // tendina opzioni
        msgDropdown: {
            isClicked: false
        }
    },
    methods: {
        // al click cambia valore di visible (utilizzato per cambiare classe active al selettore dei contatti e stampare i relativi messaggi)
        chatOpen(index){
            if (this.contacts[index].visible === false) {
                for (let i = 0; i < this.contacts.length; i++) {
                    this.contacts[i].visible = false;
                }
                this.contacts[index].visible = true;
            }
        },
        // invia un nuovo messaggio salvando il valore dell'input
        sendMessage(){
            if (this.newMessage.text[0] !== ' ' && this.newMessage.text.length > 0) {
                this.contacts.find((element) => {
                    if(element.visible === true) {
                        element.messages.push(this.newMessage);
                        this.newMessage = {date: new Date().toLocaleString(), text: '', status: 'sent'};
                        setTimeout(() => element.messages.push(this.responseMessage), 1000);
                        this.responseMessage = {date: new Date().toLocaleString(), text: 'Ok!', status: 'received'};
                    }
                })
            }
        },
        // confronta il valore del box di ricerca con il valore .userName di ogni contatto, se coincide mantiene il valore .search su true, altrimenti lo cambia in false. il v-bind delle classi nasconde gli elementi che non corrispondono alla ricerca
        search(){
            for (let i = 0; i < this.contacts.length; i++){

                filter = this.chatSearch.toUpperCase();
                console.log(this.chatSearch);

                if (this.contacts[i].userName.toUpperCase().indexOf(filter) > -1) {
                    this.contacts[i].search = true;
                } else {
                    this.contacts[i].search = false;
                }
            }
        },
        msgOptions(){
            console.log(this.msgDropdown);
            if (!this.msgDropdown.isClicked) {
                this.msgDropdown.isClicked = true;
            } else {
                this.msgDropdown.isClicked = false;
            }
        }
    }
})