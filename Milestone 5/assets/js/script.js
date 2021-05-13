const app = new Vue({

  el:'#app',
  data:{
    activeUser: 0,
    messageUser: '',
    search: '',
    user: {
      name: 'Nome Utente',
      avatar: '_io'
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
            status: 'sent',
            delete: false,
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent',
            delete: false,
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received',
            delete: false,
          }
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
            status: 'sent',
            delete: false,
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received',
            delete: false,
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent',
            delete: false,
          }
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
            status: 'received',
            delete: false,
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent',
            delete: false,
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received',
            delete: false,
          }
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
            status: 'sent',
            delete: false,
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received',
            delete: false,
          }
        ],
      },
    ],

    risposte: [
      'Ok!',
      'Va bene per stasera',
      'Sei grande',
      'Ci troviamo al solito posto alle 20!',
      'Andiamo a vedere la partita',
      'Ricordati di chiamare la mamma',
      'Complimenti per la trasmissione',
      'Domani ho lezione alle 9 e 30',
      'Andiamo a farci una corsetta?'
    ]

  },
  methods:{
    //funzione per far apparire le chat per ogni utente
    getMessages(index) {
      this.activeUser = index; //activeUser cambia valore in base all'utente cliccato
    },

    //funzione per aggiungere messaggio inviato dall'input e per la risposta automatica 
    newMessage(){
      if(this.messageUser.length > 0){

        this.contacts[this.activeUser].messages.push(
          {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: this.messageUser,
            status: 'sent',
            delete: false,
          }
        );
        this.messageUser = '';
        setTimeout(() => {
          let risposta = this.risposte[Math.floor(Math.random() * this.risposte.length)];
          this.contacts[this.activeUser].messages.push(
            {
              date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
              text: risposta,
              status: 'received',
              delete: false,
            }
          );
        }, 1000);

      };

    },

    //funzione per filtrare contatti => visualizzo solo contatti che contengono le lettere inserite nell'input
    filteredContacts(search){
      this.contacts.forEach((contact) => {
          if(contact.name.toLowerCase().includes(search.toLowerCase())){
              contact.visible = true;
          }else{
              contact.visible = false;
          }
      });
    },

    //funzione per visualizzare ultimo accesso
    lastAccess(index){
      let contactMsgs = this.contacts[index].messages;
      return contactMsgs[contactMsgs.length - 1].date;
    },

    //funzione per visualizzare ultimo messaggio
    lastMessage(index){
      let contactMsgs = this.contacts[index].messages;
      return contactMsgs[contactMsgs.length - 1].text;
    },

    //funzione per cancellare messaggio 
    deleteMessage(index){
      this.contacts[this.activeUser].messages.splice(index, 1); 
      
      if(this.contacts[this.activeUser].messages.length === 0){
        this.contacts[this.activeUser].messages = [
          {
            date: '',
            text: '',
            status: '',
            delete: ''
          }
        ]
      };
    }

  },

});