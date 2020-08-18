const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

Vue.component('todo-item', {
    template: '<li>{{todo.text}}</li>',
    props: ['todo'],
})

var app3 = new Vue({
    el: '#app-3',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'asdfasdf' },
            { id: 2, text: 'asdfasdfasdfas' },
        ]
    }
})

