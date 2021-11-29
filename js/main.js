
const app = new Vue({
    el: '#app',
    data: {
        now: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        user: {
            userName: 'Ajeje Brazorf',
            avatar: '_io',
        },
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
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
                        status: 'received',
                        date_short: dayjs().format('DD/MM/YYYY'),
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
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
                        status: 'sent',
                        date_short: dayjs().format('DD/MM/YYYY'),
                    },
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
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
                        status: 'received',
                        date_short: dayjs().format('DD/MM/YYYY'),
                    },
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        date_short: dayjs().format('DD/MM/YYYY'),
                    },
                ],
            },
        ],
        activeAccount: 0,
        activeMessage: null,
        newMessageBody: '',
        searchFor: '',
        Message: '',
        autoAnswers: [
            'sarà stato un typone',
            'solita situation',
            'hai visto il nuovo farming simulator? tanta roba!',
            'senza parole',
        ],
    },
    created() {
        dayjs.locale('it');
    },
    methods: {
        getActiveAccount(index) {
            this.activeAccount = index;
            this.activeMessage = null;
        },

        /////////////////

        getActiveMessage(i) {
            if(this.activeMessage == null || this.activeMessage != i) {
                this.activeMessage = i;
            } else {
                this.activeMessage = null;
            }
        },

        ///////////////

        sendMessage() {
            if(this.newMessageBody.length > 0) {
                this.contacts[this.activeAccount].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    date_short: dayjs().format('DD/MM/YYYY'),
                    text: this.newMessageBody,
                    status: 'sent',
                },);
                this.autoScroll();
                this.newMessageBody = '';
            }
        },

        //////////////////

        botAnswer() {
            setTimeout(()=> {
                this.contacts[this.activeAccount].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    date_short: dayjs().format('DD/MM/YYYY'),
                    text: this.autoAnswers[Math.floor(Math.random() * this.autoAnswers.length)],
                    status: 'received',
                },);
                this.autoScroll();
            },1000);
        },

        ///////////////

        autoScroll() {
                setTimeout(()=>{
                    this.$refs.bodyMessage.scrollTop = this.$refs.bodyMessage.scrollHeight;
                },1);
        },

        ////////////////

        filterContacts() {
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].name.toLowerCase().includes(this.searchFor.toLowerCase())) {
                    this.contacts[i].visible = true;
                } else {
                    this.contacts[i].visible = false;
                }
            }
        },

        ///////////////////

        modifyMessage(i) {
            const newText = prompt('inserisci il testo del nuovo messaggio');
            this.contacts[this.activeAccount].messages[this.activeMessage].text = newText;
            this.contacts[this.activeAccount].messages[this.activeMessage].date = `modificato il ${dayjs().format('DD/MM/YYYY HH:mm:ss')}`;

            this.activeMessage = null;
        },

        /////////////////////

        deleteMessage() {

            let areYouSure = confirm('Sei sicuro di voler eliminare questo messaggio?');

            if (areYouSure) {
                this.contacts[this.activeAccount].messages.splice(this.activeMessage, 1);

                this.activeMessage = null;
            } else {
                this.activeMessage = null;
            }
        },
    },
});