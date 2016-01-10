import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import expect from 'expect'


const todo = (state,action) => {
    switch(action.type){
        case "ADD_TODO":
            return {
                id:action.id,
                text:action.text,
                completed:false
            }
        case 'TOGGLE_TODO':
            if (state.id === action.id){
                return Object.assign({},state,{completed:!state.completed})
                // return { ...state,completed:!state.completed }
            }
            return state;
        default:
            return state;
    }
}

const todos = (state=[],action) =>{
    switch (action.type){
        case "ADD_TODO":
            return [...state, todo(undefined,action)] ;
        case "TOGGLE_TODO":
            return state.map(t =>
                todo(t,action)
            );
        default:
            return state;
    }
}

const visibilityFilter = (state='SHOW_ALL',action) =>{
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return state = action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({todos,visibilityFilter});

const getVibilityTodos = (todos,filter) => {
    switch(filter){
        case "SHOW_ALL":
            return todos;
        case "SHOW_ACTIVE":
            return todos.filter(todo => !todo.completed)
        case "SHOW_COMPLETED":
            return todos.filter(todo => todo.completed)
    }
}

const Todo = ({
    onClick,
    text,
    completed}
) => (
    <li 
     onClick = {onClick}
     style={{textDecoration:
        completed ? "line-through" : "none"
     }}
     >
        {text}
    </li>)


const TodoList = (
    {todos,onTodoClick}
) => (
    <ul>
        {todos.map( t => 
            <Todo key={t.id}
            {...t}
            onClick = {() => onTodoClick(t.id)}
            />
        )}
    </ul>)

import {connect} from 'react-redux'

const toggleTodo = (id) => {
    return {
        type:'TOGGLE_TODO',
        id
    }
}

const mapStateToProps = (state) => {
    return {
        todos:getVibilityTodos(state.todos,state.visibilityFilter)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick : (id) =>{
            dispatch(toggleTodo(id))
        }
    }
}
const VibiliteTodoList = connect(
    mapStateToProps,mapDispatchToProps
)(TodoList);


/* 用react-redux的 connect 生成 */ 
// class VibiliteTodoList extends React.Component {
//     componentDidMount(){
//         const {store} = this.context;
//         this.undisubscribe = store.subscribe(() => 
//             this.forceUpdate()
//         );
//     }
//     componentWillUnmount(){
//         this.undisubscribe();
//     }
//     render(){
//         const {store} = this.context;
//         const state = store.getState();
//         const props = this.props;

//         return (
//             <TodoList
//              todos={}
//              onTodoClick = {}
//             />
//         )
//     }
// }
// VibiliteTodoList.contextTypes={
//     store:React.PropTypes.object
// };

let nextTodoId = 0;
const addTodo = (text)=>{
    return{
        type:'ADD_TODO',
        id:nextTodoId++,
        text
    };
};

let AddTodo = ({dispatch}) =>{
    let input;
    return  (<div>
                <input ref={node => input = node } type="text" />
                <button onClick={() =>{
                    dispatch(addTodo(input.value));
                    input.value='';}
                }> Add Todo</button>
            </div>)
}
AddTodo = connect()(AddTodo)

// let nextTodoId = 0;
// const AddTodo = (props,{store}) =>{
//     let input;
//     return  (<div>
//                 <input ref={node => input = node } type="text" />
//                 <button onClick={()=>{
//                     store.dispatch({
//                         type:'ADD_TODO',
//                         id:nextTodoId++,
//                         text:input.value
//                     })
//                     input.value =''
//                     }
//                 }> Add Todo</button>
//             </div>)
// }
// AddTodo.contextTypes ={
//     store:React.PropTypes.object
// };

const Link = ({
    children,
    onClick,
    active
}) => {
    if (active){
        return <span>{children}</span>
    }
    return (
        <a onClick={e => {e.preventDefault;onClick()}}
                 href="#">
                {children}
            </a>)
}

const setVibilite = (filter) =>{
    return {
        type:"SET_VISIBILITY_FILTER",
        filter
    }
}

const mapDispatchVibiliteToProps = (dispatch,ownProps)=>{
    return {
        onClick: () => dispatch(setVibilite(ownProps.filter))
    }
}
const mapStateVibiliteToProps = (state,ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const FilterLink =connect(
    mapStateVibiliteToProps,
    mapDispatchVibiliteToProps
)(Link)

// class FilterLink extends React.Component {
//     componentDidMount(){
//         const {store} = this.context;
//         this.undisubscribe = store.subscribe(() => 
//             this.forceUpdate()
//         );
//     }
//     componentWillUnmount(){
//         this.undisubscribe();
//     }

//     render(){
//         const {store} = this.context;
//         const props = this.props;
//         const state = store.getState();
//         return (
//         <Link active={} 
//             onClick = {}
//         >{props.children}</Link>
//         );
//     }
// }
// FilterLink.contextTypes = {
//     store:React.PropTypes.object
// };


const FootLink = () => (
    <p>
        SHOW: {" "}
        <FilterLink filter="SHOW_ALL" >All</FilterLink>
        {" "}
        <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>
        {" "}
        <FilterLink filter="SHOW_COMPLETED" >Component</FilterLink>
    </p>)




const TodoApp = ()=> {
    return(
        <div>
            <AddTodo />
            <VibiliteTodoList />
            <FootLink />
        </div>
    );
}


ReactDOM.render(
    <Provider store = {createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root'));



// const render = () => {
//     ReactDOM.render(
//         <TodoApp todos={store.getState().todos} />,
//         document.getElementById('root')
//     );
// };
// store.subscribe(render);
// render();

/* 用的ES5写法 开始*/
// const VibilityFilterLink = React.createClass({
//     render:function(){
//         if (this.props.currentVibility === this.props.filter){
//             return (<span>{this.props.filter}</span>)
//         }
//         return (<a onClick={this.handleClick} href="#">{this.props.filter}</a>)
//     },
//     handleClick:function(e){
//         store.dispatch({type:"SET_VISIBILITY_FILTER",filter:this.props.filter})
//         e.preventDefault();
//     }
// })


// let nextTodoId = 0
// const TodoApp = React.createClass({
//     render: function(){
//         let todos = this.filterTodos(
//                 this.props.todos,
//                 this.props.visibilityFilter
//             );
//         var list=[];
//         todos.map(t =>
//             list.push(<li 
//                 onClick={() => {store.dispatch({type:"TOGGLE_TODO",id:t.id})}} 
//                 key={t.id}
//                 style={{textDecoration:t.completed ? "line-through" : "none"}}>
//                 {t.text}
//                 </li>)
//         )

//         return (<div>
//                     <input ref={node => this.input = node } type="text" />
//                     <button onClick={this.handleClick}>add test</button>
//                     <ul>
//                         {list}
//                     </ul>
//                     <p>
//                         SHOW: { " " }
//                         <VibilityFilterLink currentVibility={this.props.visibilityFilter} filter="ALL" />
//                         {" "}
//                         <VibilityFilterLink currentVibility={this.props.visibilityFilter} filter="ACTIVE"/>
//                         {" "}
//                         <VibilityFilterLink currentVibility={this.props.visibilityFilter} filter="COMPLETED" />
//                     </p>    
//                 </div>)
//     },
//     handleClick:function(){
//         store.dispatch({type:'ADD_TODO',text:this.input.value,id:nextTodoId++});
//         this.input.value = ""
//     },
//     filterTodos:function(todos,filter){
//         switch(filter){
//             case "ALL":
//                 return todos;
//             case "ACTIVE":
//                 return todos.filter(t => !t.completed);
//             case "COMPLETED":
//                 return todos.filter(t => t.completed);
//             default:
//                 return todos;

//         }
//     }
// })

// const render = () => ReactDOM.render(<TodoApp {...store.getState()}/>,
//     document.getElementById('root'));
// store.subscribe(render);
// render();
/* ES5写法结束 */

/* 测试开始 */
// console.log('Init Store')
// console.log(store.getState())

// console.log('Dispatch ADD_TODO')
// store.dispatch({type:'ADD_TODO',id:0,text:'Study redux'})
// store.dispatch({type:'ADD_TODO',id:1,text:'go shopping'})
// console.log(store.getState())

// console.log('Dispatch TOGGLE_TODO')
// store.dispatch({type:'TOGGLE_TODO',id:1})
// console.log(store.getState())

// console.log('Dispatch SET_VISIBILITY_FILTER')
// store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_COMPLETED'})
// console.log(store.getState())


// const testAddTodos = () => {
//     let beforeTodoList = [];
//     let afterTodoList = [
//         {
//             id:0,
//             text:'study redux',
//             completed:false
//         }
//     ];
//     let action = {
//         type:'ADD_TODO',
//         id:0,
//         text:'study redux'
//     }

//     expect(todos(beforeTodoList,action)).toEqual(afterTodoList)
// }
// const testToggleTodo = () => {
//     let beforeTodoList = [
//         {
//             id:0,
//             text:'study redux',
//             completed:false
//         },
//         {
//             id:1,
//             text:'go shopping',
//             completed:false
//         }
//     ];
//     let afterTodoList = [
//         {
//             id:0,
//             text:'study redux',
//             completed:false
//         },
//         {
//             id:1,
//             text:'go shopping',
//             completed:true            
//         }
//     ];
//     let action = {
//         type:'TOGGLE_TODO',
//         id:1
//     }

//     expect(todos(beforeTodoList,action)).toEqual(afterTodoList)
// }

// testAddTodos();
// testToggleTodo();
// console.log('All Test Passed!')
// / 测试结束/