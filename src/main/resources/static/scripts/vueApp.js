Vue.component('actionsList', {
    props: ['actions'],
    template: '<ul class="actions"><li v-for="action in actions">{{action.data}}</li></ul>',
    created: function () {
        Vue.resource('/action').save().then(result => result.json().then(data => data.forEach(action => {
            this.actions.push(action)
        })));
    }
});


let calc = new Vue({
    el: '#calc',
    template:
        '<div  class="calc">' +
            '<div  class="calcBox">' +
                '<input v-model="action" type="text">' +
                '<div class="numButtons"><button @click="input(num)" v-for="num in numbers">{{num}}</button>' +
                    '<button @click="reset()">CE</button>' +
                    '<button @click="input(0)" >0</button>' +
                    '<button @click="equal()" >=</button>' +
                '</div>' +
                '<div class="opersBlock">' +
                    '<button @click="input(oper)" v-for="oper in operations">{{oper}}</button>' +
                '</div>' +
                '<button @click="save()" >Save</button>' +
                '<button @click="clear()" >Clear (delete not saved)</button>' +
                '<button @click="drop()" >Drop all</button>' +
            '</div>' +
            '<actionsList :actions="actions"/>' +
        '</div>',
    data: {
        action: '',
        actions: [],
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        operations: ['+', '-', '*', '/']
    },
    methods: {
        input: function (char) {
            this.action += char;
        },
        reset: function () {
            this.action = '';
        },
        equal: function () {
            let buf = this.action;

            //not catched errors
            this.action = eval(this.action);

            this.action = this.action.toString();
            if (buf !== this.action) {
                let act = {id: '', data: buf + '=' + this.action};
                this.actions.push(act);
            }
        },
        clear: function () {
            this.actions = this.actions.filter(item => item.id !== '');
        },
        drop: function () {
            Vue.resource('/action/drop').save().then(result => console.log(result));
            this.actions = [];
        },
        save: function () {
            let newActions = this.actions.filter(item => item.id !== '');
            let message = this.actions.filter(item => item.id === '');
            Vue.resource('/action/addAll').save(message).then(result => result.json().then(data => data.forEach(action => {
                newActions.push(action)
            })));
            this.actions = newActions;
        }
    }
});