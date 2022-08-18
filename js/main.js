const app = new Vue({
  el: "#app",
  data: {
    now: dayjs().format("DD/MM/YYYY HH:mm:ss"),
    user: {
      userName: "Ajeje Brazorf",
      avatar: "_io",
    },
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
            visible: true,
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
            visible: true,
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
            visible: true,
            date_short: dayjs().format("DD/MM/YYYY"),
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
            visible: true,
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
            visible: true,
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
            visible: true,
            date_short: dayjs().format("DD/MM/YYYY"),
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
            visible: true,
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
            visible: true,
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
            visible: true,
            date_short: dayjs().format("DD/MM/YYYY"),
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
            visible: true,
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
            visible: true,
            date_short: dayjs().format("DD/MM/YYYY"),
          },
        ],
      },
    ],
    activeAccount: 0,
    activeMessage: null,
    newMessageBody: "",
    searchFor: "",
    searchForMessage: "",
    filteringMessages: false,
    sendingImage: false,
    showSearchBar: false,
    imageUrl: "",
    Message: "",
    repliedMessage: "",
    replyingBody: "",
    autoAnswers: [
      "sarà stato un typone",
      "solita situation",
      "hai visto il nuovo farming simulator? tanta roba!",
      "senza parole",
    ],
  },
  created() {
    dayjs.locale("it");
  },
  methods: {
    getActiveAccount(index) {
      this.activeAccount = index;
      this.activeMessage = null;
    },

    /////////////////

    getActiveMessage(i) {
      if (this.activeMessage == null || this.activeMessage != i) {
        this.activeMessage = i;
      } else {
        this.resetActiveMessage();
      }
    },

    ///////////////

    resetActiveMessage() {
      this.activeMessage = null;
    },

    //////////////

    sendMessage() {
      if (this.newMessageBody.length > 0) {
        this.contacts[this.activeAccount].messages.push({
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          date_short: dayjs().format("DD/MM/YYYY"),
          text: this.newMessageBody,
          status: "sent",
        });
        this.autoScroll();
        this.newMessageBody = "";
        this.botAnswer();
      }
    },

    /////////////////

    reply() {
      if (this.replyingBody.length > 0) {
        this.contacts[this.activeAccount].messages.push({
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          date_short: dayjs().format("DD/MM/YYYY"),
          text: this.replyingBody,
          status: "sent",
          replies_to: this.repliedMessage,
        });
      }
      this.repliedMessage = null;
      this.replyingBody = null;
      this.botAnswer();
      this.autoScroll();
    },

    //////////////////

    botAnswer() {
      let answer = new Promise(resolve => {
        setTimeout(() => {
          this.contacts[this.activeAccount].messages.push({
            date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            date_short: dayjs().format("DD/MM/YYYY"),
            text: this.autoAnswers[
              Math.floor(Math.random() * this.autoAnswers.length)
            ],
            status: "received",
            visible: true,
          });
          resolve();
        }, 3000);
      });
      return answer;
    },

    ///////////////

    autoScroll() {
      setTimeout(() => {
      this.$refs.bodyMessage.scrollTop = this.$refs.bodyMessage.scrollHeight;
      }, 1);
    },

    ////////////////

    filterContacts() {
      for (contact of this.contacts) {
        contact.name.toLowerCase().includes(this.searchFor.toLowerCase())
          ? (contact.visible = true)
          : (contact.visible = false);
      }
    },

    ///////////////////

    modifyMessage(i) {
      this.contacts[this.activeAccount].messages[this.activeMessage].text =
        prompt("inserisci il testo del nuovo messaggio");
      this.contacts[this.activeAccount].messages[
        this.activeMessage
      ].date = `modificato il ${dayjs().format("DD/MM/YYYY HH:mm:ss")}`;
      this.activeMessage = null;
    },

    /////////////////////

    deleteMessage() {
      let areYouSure = confirm(
        "Sei sicuro di voler eliminare questo messaggio?"
      );

      if (areYouSure) {
        this.contacts[this.activeAccount].messages.splice(
          this.activeMessage,
          1
        );
      }
      this.activeMessage = null;
    },

    ////////////////

    replyToMessage(message) {
      this.activeMessage = null;
      this.repliedMessage = message.text;
      this.$refs.reply.focus();
    },

    /////////////

    closeReplying() {
      this.repliedMessage = null;
      this.replyingBody = null;
    },

    //////////////////

    toggleChatInfos() {
      let height =
        this.$refs.chatOptions.style.height === "0px" ? "30%" : "0px";
      this.$refs.chatOptions.style.height = height;
    },

    //////////////

    sendAPicture() {
      if (!this.imageUrl) {
        return alert("Non è stato inserito alcun link");
      }

      if (this.imageUrl.indexOf("http") < 0) {
        return alert("Il link inserito non è valido");
      }

      this.contacts[this.activeAccount].messages.push({
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        date_short: dayjs().format("DD/MM/YYYY"),
        text: this.newMessageBody,
        status: "sent",
        pic: this.imageUrl,
      });
      this.newMessageBody = "";
      this.resetVisibleMessages();
      this.closeSearchBar();
      this.botAnswer().then(() => this.autoScroll());
    },

    resetImageUrl() {
      this.imageUrl = "";
    },

    openSearchingMessages() {
      if (this.showSearchBar && this.filteringMessages) {
        this.showSearchBar = false;
      } else if (!this.showSearchBar) {
        this.showSearchBar = true;
        this.sendingImage = false;
        this.filteringMessages = true;
      } else if (this.showSearchBar && !this.filteringMessages) {
        this.filteringMessages = true;
        this.sendingImage = false;
      }
    },

    openSendingImage() {
      this.resetVisibleMessages();
      if (this.showSearchBar && this.sendingImage) {
        this.showSearchBar = false;
      } else if (!this.showSearchBar) {
        this.showSearchBar = true;
        this.sendingImage = true;
        this.filteringMessages = false;
      } else if (this.showSearchBar && !this.sendingImage) {
        this.sendingImage = true;
        this.filteringMessages = false;
      }
    },

    closeSearchBar() {
      this.showSearchBar = false;
      this.searchForMessage = "";
      this.imageUrl = "";
      this.resetFilteredMessages();
      this.resetVisibleMessages();
    },

    //////////////

    searchMessage() {
      for (message of this.contacts[this.activeAccount].messages) {
        message.text.toLowerCase().includes(this.searchForMessage.toLowerCase())
          ? (message.visible = true)
          : (message.visible = false);
      }
    },

    //////////////

    resetVisibleMessages() {
      this.contacts[this.activeAccount].messages.forEach((message) => {
        message.visible = true;
      });
    },

    resetFilteredMessages() {
      this.searchForMessage = "";
      this.resetVisibleMessages();
    },
  },
  computed: {
    replying() {
      return this.repliedMessage ? false : true;
    },

    barWidth() {
      return this.$refs.messageArea.style.width;
    },

    lastMessage() {
      let lastIndex = this.contacts[this.activeAccount].messages.length - 1;
      return lastIndex;
    },
  },
});
